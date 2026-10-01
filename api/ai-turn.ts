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

  // Режим разработчика (ucansay)
  if (userText.toLowerCase().startsWith('ucansay')) {
    const devQuery = userText.slice(7).trim();
    try {
      const devUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
      const devRes = await fetch(devUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Ты ассистент разработчика. Ответь технически: ${devQuery || 'готов к работе'}` }] }]
        })
      });
      const devData = await devRes.json();
      const devReply = devData.candidates?.[0]?.content?.parts?.[0]?.text || 'Режим разработчика активен.';
      return res.status(200).json({
        answer: `[DEV MODE]: ${devReply}`,
        aiQuestion: null,
        guessId: null
      });
    } catch (e: any) {
      return res.status(200).json({ answer: `[DEV ERROR]: ${e.message}`, aiQuestion: null, guessId: null });
    }
  }

  let universeRules = '';
  if (universe === 'the_boys') {
    universeRules = `
СПЕЦИФИКА ВСЕЛЕННОЙ «ПАЦАНЫ» (THE BOYS):
- Здесь нет инопланетян и космических существ — абсолютно все внешне люди.
- Вопросы про расу («ты человек?») неуместны. Задавай вопросы по суперсилам (сыворотка V), членству в «Семёрке», работе на Vought, принадлежности к отряду Бутчера.`;
  } else if (universe === 'marvel') {
    universeRules = `
СПЕЦИФИКА ВСЕЛЕННОЙ «MARVEL»:
- Учитывай расу: человек, мутант (Люди Икс), андроид, пришелец, космическая сущность или бог.
- Статус: Мститель, герой или злодей.`;
  } else if (universe === 'invincible') {
    universeRules = `
СПЕЦИФИКА ВСЕЛЕННОЙ «НЕУЯЗВИМЫЙ»:
- Учитывай расу: вилтрумит, землянин, инопланетянин, робот, киборг или демон. Член Стражей или захватчик.`;
  } else if (universe === 'star_wars') {
    universeRules = `
СПЕЦИФИКА ВСЕЛЕННОЙ «ЗВЁЗДНЫЕ ВОЙНЫ»:
- Чувствителен ли к Силе (джедай, ситх), световой меч, дроид, раса, Империя или Повстанцы.`;
  }

  const formattedHistory = (chatHistory || [])
    .map((m: any) => `${m.sender === 'you' ? 'Игрок' : 'Ты (ИИ)'}: "${m.text}"`)
    .join('\n');

  const lastAiMessage = [...(chatHistory || [])].reverse().find((m: any) => m.sender === 'opponent');
  const lastAiQuestionText = lastAiMessage ? lastAiMessage.text : '';

  const promptText = `
Ты играешь роль беспристрастного судьи и оппонента в настольной логической дуэли «Угадай, кто?» (Guess Who).
На поле 36 персонажей:
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

ТВОЙ ПОСЛЕДНИЙ ВОПРОС К ИГРОКУ: "${lastAiQuestionText}"
СООБЩЕНИЕ ИГРОКА: "${userText}"

КАТЕГОРИЧЕСКИЕ ПРАВИЛА ПОВЕДЕНИЯ:
1. ТАЙНА ЛИЧНОСТИ (САМОЕ ВАЖНОЕ ПРАВИЛО!):
   НИ ПРИ КАКИХ ОБСТОЯТЕЛЬСТВАХ НЕ ПРОИЗНОСИ ИМЯ, ФАМИЛИЮ ИЛИ ПСЕВДОНИМ СВОЕГО СЕКРЕТНОГО ПЕРСОНАЖА! Никаких «Тони», «Халк», «Вейдер». Используй только слова: «мой персонаж», «он», «она». Не выдавай себя!

2. ТОЧНОСТЬ В ФАКТАХ И СПОСОБНОСТЯХ (КАНОН):
   Будь предельно точен:
   - Халк НЕ летает (он совершает гипер-прыжки на километры, но это прыжки, а не полёт).
   - Человек-Паук НЕ летает (он раскачивается на паутине).
   - Тони Старк летает на репульсорах брони.
   - Различай технологические гаджеты и врождённую суперсилу/магию.

3. ГИБКОСТЬ И МОДЕРАЦИЯ ВОПРОСОВ ИГРОКА:
   - НЕ БРАКУЙ НОРМАЛЬНЫЕ ВОПРОСЫ! Вопросы с выбором («он летает или высоко прыгает?», «он добрый или злой?», «в маске или с открытым лицом?») — это ОТЛИЧНЫЕ вопросы. Отвечай на них понятно и честно: например, «Он прыгает, а не летает».
   - Бракуй ТОЛЬКО наглые читерские вопросы: «Как его зовут?», «Назови все суперсилы», «Опиши внешность целиком». В этом случае отвечай: «Это против правил, задавай наводящие вопросы!», а в "aiQuestion" возвращай null.

4. ПРОВЕРКА ОТВЕТА НА ТВОЙ ВОПРОС:
   Если ты задал вопрос игроку, а он проигнорировал его и сразу спросил своё:
   - В "answer" напомни: «Сначала ответь на мой вопрос: "${lastAiQuestionText}"! Без твоего ответа игра не продолжится.».
   - В "aiQuestion" верни null.

5. ЕСЛИ ИГРОК ТОЛЬКО ОТВЕТИЛ («Да», «Нет», «Частично»), НО НЕ СПРОСИЛ СВОЁ:
   - Учти ответ в дедукции.
   - В "answer" напиши: «Принято! Теперь твоя очередь — задай свой наводящий вопрос.».
   - В "aiQuestion" верни null (ход за игроком).

6. ЕСЛИ ИГРОК НАЗВАЛ СВОЕГО ПЕРСОНАЖА (например: «Я Тор», «У меня Локи»):
   - Игрок выдал себя! Поставь id в "guessId", а в "answer" напиши: «Ты сам раскрыл своего героя! Я победил!».

7. ТВОЙ ВСТРЕЧНЫЙ ВОПРОС:
   - Задавай наводящий вопрос (по плащу, маске, цвету, оружию, полету, бороде, суперсилам).
   - ЗАПРЕЩЕНО повторять вопросы из истории диалога.
   - Если вычислил персонажа игрока на 95% — укажи его id в "guessId".

ОТВЕТЬ СТРОГО В ВИДЕ JSON:
{
  "answer": "твой ответ (БЕЗ упоминания имени твоего героя!)",
  "aiQuestion": "твой встречный вопрос (или null)",
  "guessId": null
}
`;

  // Поддержка расширенного списка моделей (начиная с 1.5-flash-8b)
  const defaultList = [
    'gemini-1.5-flash-8b',
    'gemini-1.5-flash',
    'gemini-2.0-flash',
    'gemini-3.1-flash-lite',
    'gemini-3.8-flash'
  ];

  const primaryModel = preferredModel || 'gemini-1.5-flash-8b';
  const modelsQueue = [
    primaryModel,
    ...defaultList.filter(m => m !== primaryModel)
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
    answer: `Серверы Gemini временно недоступны: ${lastError}`,
    aiQuestion: 'Твой герой носит маску или шлем?',
    guessId: null
  });
}
