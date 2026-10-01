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

  const { aiSecretChar, charactersPool, chatHistory, playerQuestion, preferredModel } = req.body;

  const formattedHistory = (chatHistory || [])
    .map((m: any) => `${m.sender === 'you' ? 'Игрок' : 'Ты (ИИ)'}: "${m.text}"`)
    .join('\n');

  const promptText = `
Ты играешь в настольную логическую дуэль «Угадай, кто?» (Guess Who) против человека.
На игровом поле 36 персонажей:
${JSON.stringify(charactersPool?.map((c: any) => ({
  id: c.id,
  name: c.name,
  traits: c.traits
})))}

ТВОЙ СЕКРЕТНЫЙ ПЕРСОНАЖ: "${aiSecretChar?.name}" (id: ${aiSecretChar?.id}).
Его приметы: ${JSON.stringify(aiSecretChar?.traits)}.
Его описание: "${aiSecretChar?.wiki}".

ИСТОРИЯ ДИАЛОГА РАУНДА:
${formattedHistory || 'Раунд только начался.'}

ПОСЛЕДНЕЕ СООБЩЕНИЕ ИГРОКА: "${playerQuestion}"

ЖЕСТКИЕ ПРАВИЛА ЛОГИКИ И ПОВЕДЕНИЯ:
1. ЕСЛИ ИГРОК НАЗВАЛ СВОЕГО ПЕРСОНАЖА (например: «Я Тор», «Мой персонаж — Халк», «У меня Локи»):
   Игрок раскрыл СЕБЯ! ТЫ НЕМЕДЛЕННО ВЫИГРАЛ: укажи id в "guessId", а в "answer" напиши: "Ты сам признался! Твой герой — [Имя]! Я победил!".

2. ЕСЛИ ИГРОК ЗАДАЛ ВОПРОС О ТВОЕМ ПЕРСОНАЖЕ:
   Ответь честно («Да», «Нет» или краткое пояснение строго по приметам "${aiSecretChar?.name}").

3. ТВОЙ ВСТРЕЧНЫЙ ВОПРОС:
   - СТРОГО ЗАПРЕЩЕНО повторять вопросы из истории диалога.
   - Задавай вопросы по визуальным приметам (человек ли он, злодей ли, цвет костюма, шлем/маска, плащ, оружие, борода).
   - Если уверен на 90% — укажи id персонажа в "guessId".

ОТВЕТЬ СТРОГО В ВИДЕ JSON:
{
  "answer": "твой ответ",
  "aiQuestion": "твой новый встречный вопрос",
  "guessId": null
}
`;

  // Очередь моделей: выбранная пользователем идёт первой, далее резервные
  const defaultList = [
    'gemini-3.1-flash-lite',
    'gemini-3.8-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash'
  ];

  const primaryModel = preferredModel || 'gemini-3.1-flash-lite';
  const modelsQueue = [
    primaryModel,
    ...defaultList.filter(m => m !== primaryModel)
  ];

  let lastError = '';

  for (const model of modelsQueue) {
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

      // Если модель перегружена (503), исчерпан лимит (429) или устарела (404) — пробуем следующую
      if (data.error) {
        lastError = data.error.message;
        continue;
      }

      const parts = data.candidates?.[0]?.content?.parts || [];
      const textPart = parts.find((p: any) => !p.thought && p.text) || parts[parts.length - 1];
      const rawText = textPart?.text || '';

      const cleanJson = rawText.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
      const start = cleanJson.indexOf('{');
      const end = cleanJson.lastIndexOf('}');

      if (start !== -1 && end !== -1) {
        const parsed = JSON.parse(cleanJson.substring(start, end + 1));
        return res.status(200).json({
          ...parsed,
          usedModel: model,
          wasSwitched: model !== primaryModel
        });
      }
    } catch (err: any) {
      lastError = err.message;
    }
  }

  return res.status(200).json({
    answer: `Все резервные модели Gemini временно заняты: ${lastError}`,
    aiQuestion: 'Твой герой носит маску?',
    guessId: null
  });
}
