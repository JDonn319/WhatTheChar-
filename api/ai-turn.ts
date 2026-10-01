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
3. Задай свой встречный вопрос игроку о его секретном персонаже (или укажи id персонажа в guessId, если уверен на 95%).

ОТВЕТЬ СТРОГО В ВИДЕ JSON БЕЗ ЛИШНЕГО ТЕКСТА:
{
  "answer": "твой ответ",
  "aiQuestion": "твой встречный вопрос",
  "guessId": null
}
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url, {
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
        ]
      })
    });

    const data = await response.json();

    // Если Google вернул ошибку, выводим её напрямую
    if (data.error) {
      return res.status(200).json({
        answer: `Ошибка Google (gemini-3.8-flash): ${data.error.message}`,
        aiQuestion: 'Твой герой мужчина?',
        guessId: null
      });
    }

    // В Gemini 3.8 фильтруем мыслительные блоки (thought) и берем итоговый текст
    const parts = data.candidates?.[0]?.content?.parts || [];
    const textPart = parts.find((p: any) => !p.thought && p.text) || parts[parts.length - 1];
    const rawText = textPart?.text || '';

    // Очищаем от markdown-разметки (```json ... ```)
    const cleanJson = rawText.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
    const start = cleanJson.indexOf('{');
    const end = cleanJson.lastIndexOf('}');

    if (start !== -1 && end !== -1) {
      const parsed = JSON.parse(cleanJson.substring(start, end + 1));
      return res.status(200).json(parsed);
    }

    throw new Error(`Не удалось распарсить ответ: ${rawText.slice(0, 100)}`);

  } catch (err: any) {
    return res.status(200).json({
      answer: `Ошибка: ${err.message}`,
      aiQuestion: 'Твой персонаж носит плащ?',
      guessId: null
    });
  }
}
