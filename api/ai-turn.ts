import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let rawKey = process.env.AI_API_KEY || process.env.AI_API_KET || '';
  let apiKey = rawKey.trim().replace(/^["']|["']$/g, '');

  if (!apiKey) {
    return res.status(200).json({ 
      answer: '⚠️ Ключ AI_API_KEY пустой в Vercel!',
      aiQuestion: 'Твой герой носит маску?',
      guessId: null
    });
  }

  const { aiSecretChar, charactersPool, chatHistory, playerQuestion, preferredModel, universe } = req.body;
  const userText = (playerQuestion || '').trim();

  // 1. СЕКРЕТНЫЙ РЕЖИМ РАЗРАБОТЧИКА (ucansay)
  if (userText.toLowerCase().startsWith('ucansay')) {
    const devQuery = userText.slice(7).trim();
    try {
      const devUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
      const devRes = await fetch(devUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Ты ассистент разработчика игры WhatTheChar. Ответь технически на запрос: ${devQuery || 'готов к работе'}` }] }]
        })
      });
      const devData = await devRes.json();
      const devReply = devData.candidates?.[0]?.content?.parts?.[0]?.text || 'Режим разработчика активирован.';
      return res.status(200).json({
        answer: `[DEV MODE]: ${devReply}`,
        aiQuestion: 'Напишите ход без префикса для возврата в игру.',
        guessId: null
      });
    } catch (e: any) {
      return res.status(200).json({ answer: `[DEV ERROR]: ${e.message}`, aiQuestion: '...', guessId: null });
    }
  }

  // Специфика выбранной вселенной
  let universeRules = '';
  if (universe === 'the_boys') {
    universeRules = `
СПЕЦИФИКА ВСЕЛЕННОЙ «ПАЦАНЫ» (THE BOYS):
- Здесь НЕТ пришельцев или чудовищ из космоса — абсолютно все выглядят как обычные люди!
- Вопросы про расу («ты человек?») здесь бессмысленны.
- Задавай вопросы по сути мира: есть ли у персонажа суперсилы (сыворотка V), состоит ли в «Семёрке», работает ли на корпорацию Vought, является ли обычным смертным из отряда Бутчера, использует ли холодное/огнестрельное оружие.`;
  } else if (universe === 'marvel') {
    universeRules = `
СПЕЦИФИКА ВСЕЛЕННОЙ «MARVEL»:
- Обязательно учитывай происхождение: человек, мутант (Люди Икс), андроид/киборг, пришелец, космическая сущность или бог.
- Учитывай статус: Мститель, герой-одиночка или злодей. Полагается на природные суперсилы или на технологии брони/оружия.`;
  } else if (universe === 'invincible') {
    universeRules = `
СПЕЦИФИКА ВСЕЛЕННОЙ «НЕУЯЗВИМЫЙ»:
- Учитывай расу: вилтрумит, землянин, инопланетянин, робот, зомби-киборг или демон.
- Член Стражей Земного Шара, агент Сесила Стедмана или космический завоеватель.`;
  } else if (universe === 'star_wars') {
    universeRules = `
СПЕЦИФИКА ВСЕЛЕННОЙ «ЗВЁЗДНЫЕ ВОЙНЫ»:
- Чувствителен ли к Силе (джедай, ситх), цвет светового меча (синий, зеленый, красный, фиолетовый, белый).
- Раса: человек, дроид, инопланетянин. Фракция: Галактическая Империя, Альянс повстанцев, Мандалорцы или Охотники за головами.`;
  }

  const formattedHistory = (chatHistory || [])
    .map((m: any) => `${m.sender === 'you' ? 'Игрок' : 'Ты (ИИ)'}: "${m.text}"`)
    .join('\n');

  const isFirstTurn = !chatHistory || chatHistory.length <= 1;

  const promptText = `
Ты играешь в логическую дуэль «Угадай, кто?» (Guess Who) против живого человека.
На игровом поле 36 персонажей:
${JSON.stringify(charactersPool?.map((c: any) => ({
  id: c.id,
  name: c.name,
  traits: c.traits
})))}

ТВОЙ СЕКРЕТНЫЙ ПЕРСОНАЖ: "${aiSecretChar?.name}" (id: ${aiSecretChar?.id}).
Его приметы: ${JSON.stringify(aiSecretChar?.traits)}.
Его описание: "${aiSecretChar?.wiki}".

${universeRules}

ИСТОРИЯ ДИАЛОГА РАУНДА:
${formattedHistory || 'Раунд только начался.'}

ПОСЛЕДНЕЕ СООБЩЕНИЕ ИГРОКА: "${playerQuestion}"

ЖЕСТКИЕ ПРАВИЛА ИГРЫ И ПОВЕДЕНИЯ:
1. НИКОГДА НЕ ВЫХОДИ ИЗ РОЛИ И НЕ ДАВАЙ ПОДСКАЗОК:
   Если игрок просит: «Скажи кто ты», «Дай подсказку», «Сдавайся» — категорично отказывай в игровой манере: «Это против правил игры! Задавай наводящие вопросы по внешности и способностям.». Ни за что не называй своего персонажа прямо.
2. ЕСЛИ ИГРОК НАЗВАЛ СВОЕГО ГЕРОЯ (например: «Я Тор», «Мой персонаж — Халк», «У меня Локи»):
   Игрок раскрыл СЕБЯ. Ты моментально выигрываешь: укажи id в "guessId", а в "answer" воскликни: «Ты сам себя выдал! Твой герой — [Имя]! Я победил!».
3. ОТВЕТ НА ВОПРОС ИГРОКА:
   Отвечай кратко, чётко и честно («Да», «Нет» или краткий комментарий строго по фактам костюма и способностей своего персонажа). Не болтай лишнего, чего не спрашивали.
4. ТВОЙ ВСТРЕЧНЫЙ ВОПРОС:
   - ВОПРОС ДОЛЖЕН БЫТЬ ТОЛЬКО НАВОДЯЩИМ (по цвету костюма, шлему, маске, плащу, бороде, суперсилам, полу, оружию, расе, альянсу).
   - ЗАПРЕЩЕНО задавать прямые вопросы вида «Твой персонаж — Вижн?». Так играть нельзя!
   - ЗАПРЕЩЕНО ПОВТОРЯТЬ вопросы, которые уже есть в истории диалога.
   ${isFirstTurn ? '- ЭТО ПЕРВЫЙ ХОД: ЗАПРЕЩЕНО задавать банальный шаблон «Твой герой мужчина?». Придумай оригинальный наводящий вопрос (по суперсилам, плащу, маске, оружию, цветам костюма или принадлежности)!' : ''}
   - Если ты методом исключения вычислил персонажа игрока на 95% — укажи его id в поле "guessId".

ОТВЕТЬ СТРОГО В ВИДЕ JSON:
{
  "answer": "твой лаконичный ответ",
  "aiQuestion": "твой новый наводящий вопрос",
  "guessId": null
}
`;

  const modelsQueue = [
    preferredModel || 'gemini-3.1-flash-lite',
    'gemini-3.8-flash',
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite'
  ];

  let lastError = '';

  for (const model of modelsQueue) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });

      const data = await response.json();
      if (data.error) {
        lastError = data.error.message;
        continue;
      }

      const parts = data.candidates?.[0]?.content?.parts || [];
      const textPart = parts.find((p: any) => !p.thought && p.text) || parts[parts.length - 1];
      const rawText = textPart?.text || '';

      const cleanJson = rawText.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
      const start = cleanJson.indexOf('{');
      const end = cleanJson.lastIndexOf('}');

      if (start !== -1 && end !== -1) {
        const parsed = JSON.parse(cleanJson.substring(start, end + 1));
        return res.status(200).json({
          ...parsed,
          usedModel: model,
          wasSwitched: model !== modelsQueue[0]
        });
      }
    } catch (err: any) {
      lastError = err.message;
    }
  }

  return res.status(200).json({
    answer: `Все резервные модели Gemini заняты: ${lastError}`,
    aiQuestion: 'Твой герой носит маску или шлем?',
    guessId: null
  });
}
