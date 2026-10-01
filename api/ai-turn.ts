import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let rawKey = process.env.AI_API_KEY || process.env.AI_API_KET || '';
  let apiKey = rawKey.trim().replace(/^["']|["']$/g, '');

  if (!apiKey) {
    return res.status(200).json({ 
      answer: '⚠️ Ключ AI_API_KEY не найден в Vercel!',
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

  // Функция выполнения запроса к конкретной модели
  async function callGemini(modelName: string) {
    const cleanModel = modelName.startsWith('models/') ? modelName : `models/${modelName}`;
    const url = `https://generativelanguage.googleapis.com/v1beta/${cleanModel}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      })
    });

    return await response.json();
  }

  try {
    // 1. Сначала пробуем модель, которую потребовал Google: gemini-3.8-flash
    let data = await callGemini('gemini-3.8-flash');

    // 2. Если Google просит другую модель в тексте ошибки — автоматически парсим ее название
    if (data.error && data.error.message?.includes('Please update your code to use models/')) {
      const match = data.error.message.match(/models\/([a-zA-Z0-9\.\-_]+)/);
      if (match && match[1] && match[1] !== 'gemini-3.8-flash') {
        data = await callGemini(match[1]);
      }
    }

    // 3. Если всё ещё ошибка — делаем резервную попытку через динамический список
    if (data.error) {
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`);
      const listData = await listRes.json();
      const valid = (listData.models || []).filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'));
      
      if (valid.length > 0) {
        // Берем самую последнюю добавленную flash-модель из аккаунта
        const fallback = valid.reverse().find((m: any) => m.name.includes('flash')) || valid[0];
        data = await callGemini(fallback.name);
      }
    }

    if (data.error) {
      return res.status(200).json({
        answer: `Ошибка Google: ${data.error.message}`,
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
