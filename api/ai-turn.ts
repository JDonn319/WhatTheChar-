import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Считываем и очищаем ключ Google AI Studio
  let apiKey = (process.env.AI_API_KEY || '').trim().replace(/^["']|["']$/g, '');

  if (!apiKey) {
    return res.status(200).json({ 
      answer: '⚠️ Ключ AI_API_KEY не найден в переменных Vercel! Зайди в Settings -> Environment Variables, добавь ключ и нажми Redeploy.',
      aiQuestion: 'Твой герой носит маску?',
      guessId: null
    });
  }

  const { aiSecretChar, charactersPool, chatHistory, playerQuestion } = req.body;

  const promptText = `
Ты играешь в логическую дуэль «Угадай, кто?» (Guess Who) против игрока.
На игровом поле ровно 36 персонажей: ${JSON.stringify(charactersPool?.map((c: any) => ({ id: c.id, name: c.name, traits: c.traits })))}.

ТВОЙ СЕКРЕТНЫЙ ПЕРСОНАЖ: "${aiSecretChar?.name}".
Его визуальные приметы: ${JSON.stringify(aiSecretChar?.traits)}.
Его биография/описание: "${aiSecretChar?.wiki}".

ПРАВИЛА ИГРЫ:
1. Игрок только что спросил тебя: "${playerQuestion}".
2. Ответь предельно честно ("Да", "Нет" или дай краткое пояснение строго по приметам своего секретного персонажа).
3. Задай встречный вопрос игроку о его секретном персонаже, чтобы отсеять лишних (или укажи id персонажа в guessId, если уверен на 95%, что разгадал игрока).

ОТВЕТЬ СТРОГО В ФОРМАТЕ JSON:
{
  "answer": "твой ответ",
  "aiQuestion": "твой встречный вопрос",
  "guessId": null
}
`;

  try {
    // Прямой официальный запрос в Google Gemini 1.5 Flash
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptText }]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      })
    });

    const data = await response.json();

    // Если Google вернул ошибку ключа или лимитов
    if (data.error) {
      return res.status(200).json({
        answer: `Ошибка Google Studio: ${data.error.message || 'Проверь ключ в Google AI Studio'}`,
        aiQuestion: 'Твой герой мужчина?',
        guessId: null
      });
    }

    const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) {
      throw new Error('Пустой ответ от нейросети');
    }

    const parsed = JSON.parse(rawJson);
    return res.status(200).json(parsed);

  } catch (err: any) {
    return res.status(200).json({
      answer: `Сбой связи с Google Gemini: ${err.message}`,
      aiQuestion: 'Твой персонаж носит плащ?',
      guessId: null
    });
  }
}
