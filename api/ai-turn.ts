import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Считываем ключ AI_API_KEY (с авто-подстраховкой) и очищаем от кавычек/пробелов
  let rawKey = process.env.AI_API_KEY || process.env.AI_API_KET || '';
  let apiKey = rawKey.trim().replace(/^["']|["']$/g, '');

  if (!apiKey) {
    return res.status(200).json({ 
      answer: '⚠️ Ключ AI_API_KEY не найден в Vercel! Зайди в Settings -> Environment Variables, убедись, что стоит галочка на Production, и нажми Redeploy.',
      aiQuestion: 'Твой герой носит маску?',
      guessId: null
    });
  }

  const { aiSecretChar, charactersPool, chatHistory, playerQuestion } = req.body;

  const promptText = `
Ты играешь в настольную логическую дуэль «Угадай, кто?» (Guess Who) против игрока.
На игровом поле 36 персонажей: ${JSON.stringify(charactersPool?.map((c: any) => ({ id: c.id, name: c.name, traits: c.traits })))}.

ТВОЙ СЕКРЕТНЫЙ ПЕРСОНАЖ: "${aiSecretChar?.name}".
Его визуальные приметы: ${JSON.stringify(aiSecretChar?.traits)}.
Его описание: "${aiSecretChar?.wiki}".

ПРАВИЛА ИГРЫ:
1. Вопрос игрока: "${playerQuestion}".
2. Ответь предельно честно ("Да", "Нет" или краткий комментарий строго по приметам твоего секретного персонажа).
3. Задай свой наводящий вопрос игроку о его секретном персонаже (или укажи id персонажа в guessId, если уверен на 95%, что разгадал игрока).

ОТВЕТЬ СТРОГО В JSON БЕЗ ЛИШНЕГО ТЕКСТА:
{
  "answer": "твой ответ",
  "aiQuestion": "твой встречный вопрос",
  "guessId": null
}
`;

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
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

    if (data.error) {
      return res.status(200).json({
        answer: `Ошибка Google Gemini: ${data.error.message}`,
        aiQuestion: 'Твой герой мужчина?',
        guessId: null
      });
    }

    const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawJson) {
      throw new Error('Пустой ответ от Gemini');
    }

    const parsed = JSON.parse(rawJson);
    return res.status(200).json(parsed);

  } catch (err: any) {
    return res.status(200).json({
      answer: `Сбой соединения с Gemini: ${err.message}`,
      aiQuestion: 'Твой персонаж носит плащ?',
      guessId: null
    });
  }
}
