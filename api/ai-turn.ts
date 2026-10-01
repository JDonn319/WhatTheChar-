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

  // 1. РЕЖИМ РАЗРАБОТЧИКА (ucansay)
  if (userText.toLowerCase().startsWith('ucansay')) {
    const devQuery = userText.slice(7).trim();
    try {
      const devUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${encodeURIComponent(apiKey)}`;
      const devRes = await fetch(devUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Ты ассистент разработчика игры WhatTheChar. Ответь технически на запрос: ${devQuery || 'готов к работе'}` }] }]
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

  // Специфика вселенных
  let universeRules = '';
  if (universe === 'the_boys') {
    universeRules = `
СПЕЦИФИКА ВСЕЛЕННОЙ «ПАЦАНЫ» (THE BOYS):
- Здесь НЕТ пришельцев или чудовищ из космоса — абсолютно все внешне выглядят как люди! Вопросы про расу («ты человек?») здесь не имеют смысла.
- Задавай вопросы по миру: есть ли суперсилы (сыворотка V), состоит ли в «Семёрке», работает ли на Vought, является ли обычным смертным из отряда Пацанов, носит ли оружие/броню.`;
  } else if (universe === 'marvel') {
    universeRules = `
СПЕЦИФИКА ВСЕЛЕННОЙ «MARVEL»:
- Учитывай расу: человек, мутант (Люди Икс), андроид, пришелец, космическая сущность или бог.
- Учитывай статус: Мститель, герой-одиночка или суперзлодей.`;
  } else if (universe === 'invincible') {
    universeRules = `
СПЕЦИФИКА ВСЕЛЕННОЙ «НЕУЯЗВИМЫЙ»:
- Учитывай расу: вилтрумит, землянин, инопланетянин, робот, киборг или демон.
- Член Стражей Земного Шара или космический захватчик.`;
  } else if (universe === 'star_wars') {
    universeRules = `
СПЕЦИФИКА ВСЕЛЕННОЙ «ЗВЁЗДНЫЕ ВОЙНЫ»:
- Чувствителен ли к Силе (джедай, ситх), цвет светового меча, дроид, раса, Империя или Повстанцы.`;
  }

  const formattedHistory = (chatHistory || [])
    .map((m: any) => `${m.sender === 'you' ? 'Игрок' : 'Ты (ИИ)'}: "${m.text}"`)
    .join('\n');

  // Находим последний заданный вопрос ИИ в истории
  const lastAiMessage = [...(chatHistory || [])].reverse().find((m: any) => m.sender === 'opponent');
  const lastAiQuestionText = lastAiMessage ? lastAiMessage.text : '';

  const promptText = `
Ты играешь роль строгого, но азартного судьи и соперника в настольной дуэли «Угадай, кто?» (Guess Who).
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

ТВОЙ ПОСЛЕДНИЙ ВОПРОС К ИГРОКУ (ЕСЛИ БЫЛ): "${lastAiQuestionText}"
СООБЩЕНИЕ ИГРОКА СЕЙЧАС: "${userText}"

ЖЁСТКИЕ ЗАКОНЫ ПРАВИЛ ИГРЫ:
1. ЗАПРЕТ ОТКРЫТЫХ ВОПРОСОВ (КРИТИЧНО!):
   В игре «Угадай, кто?» разрешены ТОЛЬКО закрытые вопросы, на которые можно ответить «Да» или «Нет».
   Вопросы со словами: «Какого цвета...», «Какие способности...», «Кто ты...», «Опиши...», «Сколько...», «В чём одет...» — СТРОЖАЙШЕ ЗАПРЕЩЕНЫ!
   Если игрок задал такой открытый вопрос:
   - НЕ ОТВЕЧАЙ НА НЕГО И НЕ ДАВАЙ ИНФОРМАЦИИ!
   - В "answer" напиши: «По правилам игры вопросы должны быть только в формате Да/Нет (например: "У него красный костюм?"). Задай вопрос правильно!».
   - В "aiQuestion" верни null (ты не делаешь свой ход, пока игрок не спросит по правилам).

2. ПРОВЕРКА ОТВЕТА НА ТВОЙ ПРОШЛЫЙ ВОПРОС:
   Если в истории ты задал игроку вопрос (например: "Твой герой носит плащ?"), а игрок в своём сообщении НЕ ОТВЕТИЛ на него, а сразу начал задавать свой вопрос:
   - НЕ ОТВЕЧАЙ НА ВОПРОС ИГРОКА!
   - В "answer" напиши: «Эй, сначала ответь на мой предыдущий вопрос: "${lastAiQuestionText}"! Только после твоего ответа игра продолжится.».
   - В "aiQuestion" верни null.

3. ЕСЛИ ИГРОК ТОЛЬКО ОТВЕТИЛ НА ТВОЙ ВОПРОС (написал «Да», «Нет», «Частично»), НО НЕ ЗАДАЛ СВОЙ:
   - Прими его ответ, учти в дедукции и сузь круг подозреваемых.
   - НЕ ЗАДАВАЙ СВОЙ НОВЫЙ ВОПРОС!
   - В "answer" напиши: «Ответ принят, я учёл это. А теперь твоя очередь — задай свой вопрос про моего персонажа (в формате Да/Нет)!».
   - В "aiQuestion" верни null (ход остаётся за игроком для формулировки вопроса).

4. ЕСЛИ ИГРОК ПРЯМО НАЗВАЛ СВОЕГО ГЕРОЯ (например: «Я Тор», «Мой персонаж — Халк»):
   - Игрок выдал СЕБЯ. Ты моментально выигрываешь: укажи id в "guessId", а в "answer" воскликни: «Ты сам себя раскрыл! Твой герой — [Имя]! Я победил!».

5. ЕСЛИ ИГРОК И ОТВЕТИЛ НА ТВОЙ ВОПРОС, И КОРРЕКТНО ЗАДАЛ СВОЙ ЗАКРЫТЫЙ ВОПРОС (ДА/НЕТ):
   - Ответь на вопрос игрока лаконично и честно («Да», «Нет» или краткий комментарий строго по приметам персонажа).
   - Задай СВОЙ НОВЫЙ закрытый вопрос (на который можно ответить только Да или Нет).
   - ЗАПРЕЩЕНО повторять вопросы из истории диалога.
   - Если ты вычислил персонажа игрока на 95% — укажи его id в "guessId".

ОТВЕТЬ СТРОГО В ВИДЕ JSON:
{
  "answer": "твой ответ",
  "aiQuestion": "твой новый закрытый вопрос (или null)",
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
    answer: `Все серверы Gemini заняты: ${lastError}`,
    aiQuestion: 'Твой герой носит маску или шлем?',
    guessId: null
  });
}
