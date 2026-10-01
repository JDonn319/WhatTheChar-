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
Ты играешь в логическую дуэль «Угадай, кто?» (Guess Who) против игрока.
На игровом поле 36 персонажей: ${JSON.stringify(charactersPool?.map((c: any) => ({ id: c.id, name: c.name, traits: c.traits })))}.

ТВОЙ СЕКРЕТНЫЙ ПЕРСОНАЖ: "${aiSecretChar?.name}".
Его визуальные приметы: ${JSON.stringify(aiSecretChar?.traits)}.
Его описание: "${aiSecretChar?.wiki}".

ПРАВИЛА ИГРЫ:
1. Вопрос игрока: "${playerQuestion}".
2. Ответь предельно честно ("Да", "Нет" или краткий комментарий строго по приметам твоего секретного персонажа).
3. Задай свой встречный вопрос игроку о его секретном персонаже (или укажи id персонажа в guessId, если уверен на 95%).

ОТВЕТЬ СТРОГО В JSON БЕЗ ЛИШНЕГО ТЕКСТА:
{
  "answer": "твой ответ",
  "aiQuestion": "твой встречный вопрос",
  "guessId": null
}
`;

  // Каскад моделей: если основная 3.8 перегружена, мгновенно подхватывает 3.1-flash-lite
  const models = [
    'gemini-3.8-flash',
    'gemini-3.1-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite'
  ];

  let lastError = '';

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });

      const data = await response.json();

      // Если модель перегружена (503 / high demand) или временно недоступна — сразу пробуем следующую
      if (data.error) {
        lastError = data.error.message;
        continue;
      }

      // Извлекаем ответ (отсекая технические блоки мыслей)
      const parts = data.candidates?.[0]?.content?.parts || [];
      const textPart = parts.find((p: any) => !p.thought && p.text) || parts[parts.length - 1];
      const rawText = textPart?.text || '';

      const cleanJson = rawText.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
      const start = cleanJson.indexOf('{');
      const end = cleanJson.lastIndexOf('}');

      if (start !== -1 && end !== -1) {
        const parsed = JSON.parse(cleanJson.substring(start, end + 1));
        return res.status(200).json(parsed);
      }
    } catch (err: any) {
      lastError = err.message;
    }
  }

  return res.status(200).json({
    answer: `Серверы Google временно перегружены: ${lastError}. Попробуйте отправить ещё раз через секунду.`,
    aiQuestion: 'Твой герой носит маску?',
    guessId: null
  });
}
