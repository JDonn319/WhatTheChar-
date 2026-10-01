import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.AI_API_KEY?.trim();

  // Если ключ забыли добавить в Vercel
  if (!apiKey) {
    return res.status(200).json({ 
      answer: '⚠️ Ключ AI_API_KEY не найден в переменных Vercel. Проверь Settings -> Environment Variables и сделай Redeploy.',
      aiQuestion: 'Твой персонаж носит маску или шлем?',
      guessId: null
    });
  }

  const { aiSecretChar, charactersPool, chatHistory, playerQuestion } = req.body;

  const promptText = `
Ты играешь в настольную логическую дуэль «Угадай, кто?» (Guess Who) против игрока.
Список всех 36 персонажей на доске: ${JSON.stringify(charactersPool?.map((c: any) => ({ id: c.id, name: c.name, traits: c.traits })))}.

ТВОЙ СЕКРЕТНЫЙ ПЕРСОНАЖ: "${aiSecretChar?.name}".
Его визуальные приметы: ${JSON.stringify(aiSecretChar?.traits)}.
Его описание: "${aiSecretChar?.wiki}".

ПРАВИЛА ИГРЫ:
1. Игрок только что спросил тебя: "${playerQuestion}".
2. Ответь предельно честно ("Да", "Нет" или краткое пояснение строго по приметам твоего секретного персонажа).
3. Задай встречный вопрос игроку о его секретном персонаже, чтобы сузить круг подозреваемых (ИЛИ, если ты на 95% уверен, укажи его id в поле guessId).

ОТВЕТЬ СТРОГО В ФОРМАТЕ JSON:
{
  "answer": "твой честный ответ игроку",
  "aiQuestion": "твой встречный вопрос игроку",
  "guessId": null
}
`;

  try {
    // ВАРИАНТ А: Ключ напрямую от Google Gemini (начинается на AIza...)
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
          answer: `Ошибка Google Gemini: ${data.error.message || 'неверный ключ'}`,
          aiQuestion: 'Твой персонаж мужчина?',
          guessId: null
        });
      }

      const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(rawJson);
      return res.status(200).json(parsed);
    } 

    // ВАРИАНТ Б: Ключ OpenRouter / DeepSeek (начинается на sk-...)
    else {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://whatthechar.vercel.app',
          'X-Title': 'WhatTheChar'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-001',
          messages: [
            { role: 'system', content: 'Ты помощник-соперник в настольной игре. Всегда отвечай только валидным JSON.' },
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
          answer: `Ошибка OpenRouter: ${data.error.message || 'проверьте баланс или ключ'}`,
          aiQuestion: 'Твой герой носит плащ?',
          guessId: null
        });
      }

      const content = data.choices?.[0]?.message?.content;
      const parsed = JSON.parse(content);
      return res.status(200).json(parsed);
    }
  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(200).json({
      answer: `Сбой связи с сервером: ${err.message || 'попробуйте ещё раз'}`,
      aiQuestion: 'Твой персонаж человек?',
      guessId: null
    });
  }
}
