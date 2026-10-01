import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Очищаем ключ от кавычек, пробелов и случайного префикса "Bearer "
  let rawKey = process.env.AI_API_KEY || '';
  let apiKey = rawKey.trim().replace(/^["']|["']$/g, '');
  if (apiKey.toLowerCase().startsWith('bearer ')) {
    apiKey = apiKey.slice(7).trim();
  }

  if (!apiKey) {
    return res.status(200).json({ 
      answer: '⚠️ Ключ AI_API_KEY пустой в настройках Vercel.',
      aiQuestion: 'Твой герой носит маску?',
      guessId: null
    });
  }

  const { aiSecretChar, charactersPool, chatHistory, playerQuestion } = req.body;

  const promptText = `
Ты играешь в настольную игру «Угадай, кто?» (Guess Who) против игрока.
Список 36 персонажей: ${JSON.stringify(charactersPool?.map((c: any) => ({ id: c.id, name: c.name, traits: c.traits })))}.

ТВОЙ СЕКРЕТНЫЙ ПЕРСОНАЖ: "${aiSecretChar?.name}".
Его приметы: ${JSON.stringify(aiSecretChar?.traits)}.
Описание: "${aiSecretChar?.wiki}".

ПРАВИЛА:
1. Вопрос игрока: "${playerQuestion}".
2. Ответь честно ("Да", "Нет" или краткий комментарий строго по приметам персонажа).
3. Задай свой наводящий вопрос игроку о его секретном персонаже (или укажи guessId, если уверен на 95%).

ФОРМАТ ОТВЕТА СТРОГО JSON:
{
  "answer": "твой ответ",
  "aiQuestion": "твой встречный вопрос",
  "guessId": null
}
`;

  try {
    // 1. Если это ключ Google Gemini (начинается на AIza...)
    if (apiKey.startsWith('AIza')) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });

      const data = await response.json();
      if (data.error) {
        return res.status(200).json({
          answer: `Ошибка Google Gemini: ${data.error.message}`,
          aiQuestion: 'Твой персонаж мужчина?',
          guessId: null
        });
      }

      const parsed = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
      return res.status(200).json(parsed);
    } 

    // 2. Если это OpenRouter (sk-or-...) или DeepSeek
    else {
      const authHeader = `Bearer ${apiKey}`;
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'authorization': authHeader,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://whatthechar.vercel.app',
          'X-Title': 'WhatTheChar'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-001',
          messages: [
            { role: 'system', content: 'Отвечай строго валидным JSON.' },
            ...chatHistory?.map((m: any) => ({
              role: m.sender === 'you' ? 'user' : 'assistant',
              content: m.text
            })) || [],
            { role: 'user', content: promptText }
          ],
          response_format: { type: 'json_object' }
        })
      });

      const data = await response.json();

      if (data.error) {
        return res.status(200).json({
          answer: `Ошибка OpenRouter: ${data.error.message || JSON.stringify(data.error)}`,
          aiQuestion: 'Твой персонаж носит плащ?',
          guessId: null
        });
      }

      const content = data.choices?.[0]?.message?.content;
      const parsed = JSON.parse(content);
      return res.status(200).json(parsed);
    }
  } catch (err: any) {
    return res.status(200).json({
      answer: `Ошибка соединения: ${err.message}`,
      aiQuestion: 'Твой герой человек?',
      guessId: null
    });
  }
}
