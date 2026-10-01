import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Считываем и аккуратно очищаем ключ
  let rawKey = process.env.AI_API_KEY || '';
  let apiKey = rawKey.trim().replace(/^["']|["']$/g, '');
  if (apiKey.toLowerCase().startsWith('bearer ')) {
    apiKey = apiKey.slice(7).trim();
  }

  // 1. Проверка на наличие ключа
  if (!apiKey) {
    return res.status(200).json({ 
      answer: '⚠️ Ошибка: Переменная AI_API_KEY пустая в Vercel. Зайди в Settings -> Environment Variables, добавь ключ и нажми Redeploy.',
      aiQuestion: 'Твой герой носит маску?',
      guessId: null
    });
  }

  // 2. Диагностика формата ключа
  const isOpenRouter = apiKey.startsWith('sk-or-v1-');
  const isGeminiDirect = apiKey.startsWith('AIza');

  if (!isOpenRouter && !isGeminiDirect) {
    return res.status(200).json({
      answer: `⚠️ Некорректный формат ключа! Длина: ${apiKey.length}, начинается на "${apiKey.slice(0, 8)}...".\n\nДля OpenRouter ключ обязан начинаться с "sk-or-v1-", а для Google Studio — с "AIzaSy". Проверь значение в Vercel.`,
      aiQuestion: 'Твой персонаж человек?',
      guessId: null
    });
  }

  const { aiSecretChar, charactersPool, chatHistory, playerQuestion } = req.body;

  const promptText = `
Ты играешь в логическую дуэль «Угадай, кто?» (Guess Who) против человека.
Список 36 персонажей на доске: ${JSON.stringify(charactersPool?.map((c: any) => ({ id: c.id, name: c.name, traits: c.traits })))}.

ТВОЙ СЕКРЕТНЫЙ ПЕРСОНАЖ: "${aiSecretChar?.name}".
Его приметы: ${JSON.stringify(aiSecretChar?.traits)}.
Описание: "${aiSecretChar?.wiki}".

ПРАВИЛА:
1. Вопрос игрока: "${playerQuestion}".
2. Ответь предельно честно ("Да", "Нет" или краткое пояснение строго по приметам твоего персонажа).
3. Задай свой наводящий вопрос игроку о его секретном персонаже (или укажи id в guessId, если уверен на 95%).

ОТВЕТЬ СТРОГО В JSON:
{
  "answer": "твой ответ",
  "aiQuestion": "твой встречный вопрос",
  "guessId": null
}
`;

  try {
    // ВАРИАНТ 1: Прямой ключ Google Gemini
    if (isGeminiDirect) {
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

    // ВАРИАНТ 2: OpenRouter (Используем полностью бесплатную модель :free)
    else {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://whatthechar.vercel.app',
          'X-Title': 'WhatTheChar Game'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free', // 100% бесплатная модель
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
          aiQuestion: 'Твой герой носит плащ?',
          guessId: null
        });
      }

      const content = data.choices?.[0]?.message?.content;
      const parsed = JSON.parse(content);
      return res.status(200).json(parsed);
    }
  } catch (err: any) {
    return res.status(200).json({
      answer: `Ошибка сервера: ${err.message}`,
      aiQuestion: 'Твой персонаж человек?',
      guessId: null
    });
  }
}
