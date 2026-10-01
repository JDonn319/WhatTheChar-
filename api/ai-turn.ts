import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      answer: 'Ошибка: API-ключ не настроен в Vercel Environment Variables.',
      aiQuestion: 'Твой ход!' 
    });
  }

  const { aiSecretChar, charactersPool, chatHistory, playerQuestion } = req.body;

  const systemPrompt = `
Ты играешь в логическую дуэль «Угадай, кто?» (Guess Who) против игрока.
На поле всего 36 персонажей: ${JSON.stringify(charactersPool.map((c: any) => ({ id: c.id, name: c.name, traits: c.traits })))}.

ТВОЙ СЕКРЕТНЫЙ ПЕРСОНАЖ: "${aiSecretChar.name}".
Его приметы: ${JSON.stringify(aiSecretChar.traits)}.
Его описание: "${aiSecretChar.wiki}".

ПРАВИЛА:
1. Игрок задал вопрос: "${playerQuestion}".
2. Ответь на вопрос игрока предельно честно ("Да", "Нет" или краткое пояснение строго по приметам твоего секретного персонажа).
3. Задай встречный наводящий вопрос игроку про его персонажа, чтобы отсеять персонажей (или, если ты на 100% уверен, кого загадал игрок, сделай финальную догадку в поле guessId).

ОТВЕТЬ СТРОГО В ФОРМАТЕ JSON БЕЗ ЛИШНЕГО ТЕКСТА:
{
  "answer": "Краткий честный ответ игроку",
  "aiQuestion": "Твой встречный вопрос игроку о его персонаже",
  "guessId": null // или "id_персонажа", если ты уверен, что разгадал игрока
}
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://whatthechar.vercel.app',
        'X-Title': 'WhatTheChar Game'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001', // или 'deepseek/deepseek-chat', 'qwen/qwen-2.5-72b-instruct'
        messages: [
          { role: 'system', content: systemPrompt },
          ...chatHistory.map((m: any) => ({
            role: m.sender === 'you' ? 'user' : 'assistant',
            content: m.text
          })),
          { role: 'user', content: playerQuestion }
        ],
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('AI Error:', error);
    return res.status(200).json({
      answer: 'Да, пожалуй.',
      aiQuestion: 'Твой персонаж носит маску или шлем?',
      guessId: null
    });
  }
}
