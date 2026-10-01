import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let rawKey = process.env.AI_API_KEY || process.env.AI_API_KET || '';
  let apiKey = rawKey.trim().replace(/^["']|["']$/g, '');

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

  try {
    // ШАГ 1: Спрашиваем у Google список доступных моделей для этого ключа
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`);
    const listData = await listRes.json();

    if (listData.error) {
      return res.status(200).json({
        answer: `Ошибка Google при проверке ключа: ${listData.error.message}`,
        aiQuestion: 'Твой персонаж мужчина?',
        guessId: null
      });
    }

    // Фильтруем только те модели, которые умеют отвечать на текст (generateContent)
    const validModels = (listData.models || []).filter((m: any) =>
      m.supportedGenerationMethods?.includes('generateContent')
    );

    if (validModels.length === 0) {
      return res.status(200).json({
        answer: 'Google API не нашел активных моделей для этого ключа. Проверьте права в Google AI Studio.',
        aiQuestion: 'Твой герой носит шлем?',
        guessId: null
      });
    }

    // Авто-выбор: ищем 2.0-flash -> 2.5-flash -> любую flash -> первую попавшуюся
    const chosenModel = 
      validModels.find((m: any) => m.name.includes('2.0-flash')) ||
      validModels.find((m: any) => m.name.includes('2.5-flash')) ||
      validModels.find((m: any) => m.name.includes('flash')) ||
      validModels[0];

    const modelName = chosenModel.name; // Например, "models/gemini-2.0-flash"

    // ШАГ 2: Отправляем ход выбранной рабочей модели
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(generateUrl, {
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
        answer: `Ошибка генерации (${modelName}): ${data.error.message}`,
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
      answer: `Сбой соединения с Gemini: ${err.message}`,
      aiQuestion: 'Твой персонаж носит плащ?',
      guessId: null
    });
  }
}
