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

  // Форматируем историю диалога для глубокой памяти
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
1. ЕСЛИ ИГРОК НАЗВАЛ СВОЕГО ПЕРСОНАЖА:
   Если игрок в сообщении прямо признался, кто он (например: «Я Тор», «Мой персонаж — Халк», «У меня Локи», «Я играю за Блейда»), НЕ ОТВЕЧАЙ "нет это не он". Игрок сказал это про СЕБЯ! ТЫ НЕМЕДЛЕННО ВЫИГРАЛ: найди этого персонажа, укажи его точный id в поле "guessId", а в "answer" радостно воскликни: "Ты сам признался! Твой персонаж — [Имя]! Я победил!".

2. ЕСЛИ ИГРОК ЗАДАЛ ВОПРОС О ТВОЕМ ПЕРСОНАЖЕ:
   Ответь честно («Да», «Нет» или краткое пояснение строго по приметам "${aiSecretChar?.name}").

3. ТВОЙ ВСТРЕЧНЫЙ ВОПРОС И ДЕДУКЦИЯ:
   - ВНИМАТЕЛЬНО ПРОЧТИ ИСТОРИЮ! СТРОГО ЗАПРЕЩЕНО задавать вопросы, которые ты уже задавал в прошлых ходах. Не повторяйся!
   - Логически исключай персонажей по ответам игрока («Да/Нет»).
   - Задавай вопросы по визуальным приметам (цвет костюма, человек ли он, злодей ли, носит ли шлем/маску, плащ, есть ли оружие, борода).
   - Если после отсеивания у тебя остался ровно 1 кандидат или ты уверен на 90% — укажи его id в "guessId", чтобы сделать победную догадку!

ОТВЕТЬ СТРОГО В ВИДЕ JSON:
{
  "answer": "твой ответ на вопрос игрока",
  "aiQuestion": "твой НОВЫЙ неповторяющийся вопрос игроку",
  "guessId": null // или "id_персонажа"
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
        contents: [{ parts: [{ text: promptText }] }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({
        answer: `Ошибка Google (gemini-3.8-flash): ${data.error.message}`,
        aiQuestion: 'Твой герой мужчина?',
        guessId: null
      });
    }

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

    throw new Error('Пустой ответ');
  } catch (err: any) {
    return res.status(200).json({
      answer: `Ошибка: ${err.message}`,
      aiQuestion: 'Твой персонаж носит плащ?',
      guessId: null
    });
  }
}
