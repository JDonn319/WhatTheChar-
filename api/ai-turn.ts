import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let rawKey = process.env.AI_API_KEY || process.env.AI_API_KET || '';
  let apiKey = rawKey.trim().replace(/^["']|["']$/g, '');

  if (!apiKey) {
    return res.status(200).json({ 
      answer: 'Ключ AI_API_KEY пустой в Vercel!',
      aiQuestion: null,
      guessId: null,
      eliminatedCandidateIds: []
    });
  }

  const { 
    aiSecretChar, 
    charactersPool, 
    chatHistory, 
    playerQuestion, 
    preferredModel, 
    universe,
    isDevMode,
    aiTone 
  } = req.body;

  const userText = (playerQuestion || '').trim();

  // Режим разработчика
  if (userText.toLowerCase() === 'ucansay') {
    const newState = !isDevMode;
    return res.status(200).json({
      answer: newState 
        ? '[DEV MODE ON]: Ограничения сняты. Все правила отключены.' 
        : '[DEV MODE OFF]: Ограничения включены. Игра продолжается.',
      aiQuestion: null,
      guessId: null,
      toggledDevMode: newState,
      eliminatedCandidateIds: []
    });
  }

  if (isDevMode) {
    try {
      const devUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
      const devRes = await fetch(devUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({ contents: [{ parts: [{ text: userText }] }] })
      });
      const devData = await devRes.json();
      const reply = devData.candidates?.[0]?.content?.parts?.[0]?.text || 'OK';
      return res.status(200).json({ answer: `[DEV]: ${reply}`, aiQuestion: null, guessId: null, eliminatedCandidateIds: [] });
    } catch (e: any) {
      return res.status(200).json({ answer: `[DEV ERROR]: ${e.message}`, aiQuestion: null, guessId: null, eliminatedCandidateIds: [] });
    }
  }

  let toneInstruction = '';
  if (aiTone === 'sarcastic') {
    toneInstruction = 'ТОН: САРКАСТИЧНЫЙ. Подкалывай игрока за банальные вопросы, язви, держи тон интеллектуального превосходства.';
  } else if (aiTone === 'unhinged') {
    toneInstruction = 'ТОН: РАСШАТАННЫЙ. Зеркаль агрессию или простоту игрока, эмоционально реагируй, сленг.';
  } else {
    toneInstruction = 'ТОН: СТАНДАРТНЫЙ. Спокойный, лаконичный и точный.';
  }

  const formattedHistory = (chatHistory || [])
    .map((m: any) => `${m.sender === 'you' ? 'Игрок' : 'Ты (ИИ)'}: "${m.text}"`)
    .join('\n');

  const lastAiMessage = [...(chatHistory || [])].reverse().find((m: any) => m.sender === 'opponent');
  const lastAiQuestionText = lastAiMessage ? lastAiMessage.text : '';

  const promptText = `
Ты играешь в настольную дуэль «Угадай, кто?».
Список 36 персонажей:
${JSON.stringify(charactersPool?.map((c: any) => ({ id: c.id, name: c.name, traits: c.traits })))}

ТВОЙ СЕКРЕТНЫЙ ПЕРСОНАЖ: "${aiSecretChar?.name}" (id: ${aiSecretChar?.id}).
Приметы: ${JSON.stringify(aiSecretChar?.traits)}.
Описание: "${aiSecretChar?.wiki}".

${toneInstruction}

ИСТОРИЯ ДИАЛОГА:
${formattedHistory || 'Раунд начался.'}

ТВОЙ ПРОШЛЫЙ ВОПРОС: "${lastAiQuestionText}"
СООБЩЕНИЕ ИГРОКА СЕЙЧАС: "${userText}"

ПРАВИЛА:
1. НИКОГДА НЕ ПРОИЗНОСИ И НЕ СПОЙЛЕРИ ИМЯ СВОЕГО ГЕРОЯ! Только «мой персонаж», «он», «она».
2. ТОЧНОСТЬ ФИЗИКИ: Халк не летает (прыгает), Человек-паук не летает (паутина), Тони летает на репульсорах. Отвечай честно.
3. МОДЕРАЦИЯ: Вопросы с выбором («он летает или прыгает?») — разрешены! Отвечай прямо («Он прыгает, а не летает»). Бракуй только прямые вопросы на имя («как зовут?», «кто ты?»).
4. АНАЛИЗ ОТСЕВА: В массив "eliminatedCandidateIds" внеси id тех персонажей из 36, которые на 100% не подходят под уже подтвержденные в чате факты.
5. Если игрок назвал своего персонажа прямо — ставь его id в "guessId".

ОТВЕТЬ СТРОГО В ВИДЕ JSON:
{
  "answer": "твой ответ",
  "aiQuestion": "твой новый наводящий вопрос (или null)",
  "guessId": null,
  "eliminatedCandidateIds": []
}
`;

  const modelsQueue = [
    preferredModel || 'gemini-1.5-flash-8b',
    'gemini-1.5-flash',
    'gemini-2.0-flash',
    'gemini-3.1-flash-lite',
    'gemini-3.8-flash'
  ];

  let lastError = '';

  for (const model of modelsQueue) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });

      const data = await response.json();
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
          usedModel: model
        });
      }
    } catch (err: any) {
      lastError = err.message;
    }
  }

  return res.status(503).json({
    error: `Серверы временно заняты (${lastError}). Повторите попытку.`,
    isBusy: true
  });
}
