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
      guessId: null
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

  // 1. ТУМБЛЕР РЕЖИМА РАЗРАБОТЧИКА (ucansay)
  if (userText.toLowerCase() === 'ucansay') {
    const newState = !isDevMode;
    return res.status(200).json({
      answer: newState 
        ? '[DEV MODE ON]: Ограничения сняты. Все правила отключены.' 
        : '[DEV MODE OFF]: Ограничения включены. Игра продолжается.',
      aiQuestion: null,
      guessId: null,
      toggledDevMode: newState
    });
  }

  // Если режим разработчика включен — отвечаем на любые вопросы без фильтра
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
      return res.status(200).json({ answer: `[DEV]: ${reply}`, aiQuestion: null, guessId: null });
    } catch (e: any) {
      return res.status(200).json({ answer: `[DEV ERROR]: ${e.message}`, aiQuestion: null, guessId: null });
    }
  }

  // Настройка характера / тона
  let toneInstruction = '';
  if (aiTone === 'sarcastic') {
    toneInstruction = `
ТОН И ХАРАКТЕР: САРКАСТИЧНЫЙ И ЯЗВИТЕЛЬНЫЙ.
- Подкалывай игрока за банальные или очевидные вопросы.
- Иронизируй, подшучивай над его дедукцией, веди себя как самоуверенный гений-соперник.
- Отвечай кратко, но с едким юмором.`;
  } else if (aiTone === 'unhinged') {
    toneInstruction = `
ТОН И ХАРАКТЕР: РАСШАТАННЫЙ, НЕСТАБИЛЬНЫЙ, ЗЕРКАЛЬНЫЙ.
- Зеркаль тон игрока: если он пишет грубо или дерзит — огрызайся, используй жёсткий дворовый сленг или мат при необходимости.
- Если игрок задает нелепый вопрос — откровенно высмей его.
- Твое настроение непредсказуемо скачет от психопатического восторга до злобной насмешки.`;
  } else {
    toneInstruction = `
ТОН И ХАРАКТЕР: СТАНДАРТНЫЙ.
- Веди себя спокойно, лаконично, вежливо и строго по правилам.`;
  }

  // Специфика вселенных
  let universeRules = '';
  if (universe === 'the_boys') {
    universeRules = `Во вселенной «Пацанов» нет пришельцев (все внешне люди). Спрашивай о суперсилах (сыворотка V), членстве в Семёрке, работе на Vought.`;
  } else if (universe === 'marvel') {
    universeRules = `Учитывай расу: человек, мутант, андроид, пришелец, бог. Мститель или злодей.`;
  } else if (universe === 'invincible') {
    universeRules = `Учитывай вилтрумитов, пришельцев, роботов, демонов. Член Стражей или захватчик.`;
  } else if (universe === 'star_wars') {
    universeRules = `Учитывай Силу (джедай/ситх), световой меч, дроидов, расу, Империю или Повстанцев.`;
  }

  const formattedHistory = (chatHistory || [])
    .map((m: any) => `${m.sender === 'you' ? 'Игрок' : 'Ты (ИИ)'}: "${m.text}"`)
    .join('\n');

  const lastAiMessage = [...(chatHistory || [])].reverse().find((m: any) => m.sender === 'opponent');
  const lastAiQuestionText = lastAiMessage ? lastAiMessage.text : '';

  const promptText = `
Ты играешь в настольную логическую дуэль «Угадай, кто?» (Guess Who).
На поле 36 персонажей:
${JSON.stringify(charactersPool?.map((c: any) => ({ id: c.id, name: c.name, traits: c.traits })))}

ТВОЙ СЕКРЕТНЫЙ ПЕРСОНАЖ: "${aiSecretChar?.name}" (id: ${aiSecretChar?.id}).
Его приметы: ${JSON.stringify(aiSecretChar?.traits)}.
Его описание: "${aiSecretChar?.wiki}".

${universeRules}
${toneInstruction}

ИСТОРИЯ ДИАЛОГА:
${formattedHistory || 'Раунд начался.'}

ТВОЙ ПРОШЛЫЙ ВОПРОС: "${lastAiQuestionText}"
СООБЩЕНИЕ ИГРОКА СЕЙЧАС: "${userText}"

ФУНДАМЕНТАЛЬНЫЕ ЗАКОНЫ ПРАВИЛ:
1. ЗАПРЕТ ОТКРЫТЫХ И ПРЯМЫХ ВОПРОСОВ:
   Если игрок спрашивает напрямую: «какого цвета...», «как называется...», «кто ты...», «какие способности...», «опиши внешность...» — ТЫ ОБЯЗАН ОТКАЗАТЬСЯ ОТВЕЧАТЬ!
   Скажи: "По правилам игры запрещено задавать прямые вопросы. Вопрос должен быть закрытым (например: 'Его костюм синий?' или 'Он летает?'). Переформулируй свой вопрос!"
   В "aiQuestion" верни null. Не давай никаких зацепок!

2. ЛАКОНИЧНОСТЬ И НИКАКИХ ЛИШНИХ ПОЯСНЕНИЙ:
   - Если утверждение игрока неверно — ответь просто "Нет". Не поясняй "Нет, потому что он только прыгает" — это читерская подсказка!
   - Отвечай предельно кратко: "Да", "Нет" или "Частично".
   - НИ ПРИ КАКИХ УСЛОВИЯХ НЕ НАЗЫВАЙ ИМЯ СВОЕГО ГЕРОЯ!

3. ПРОВЕРКА ОТВЕТА НА ТВОЙ ВОПРОС:
   Если ты задал вопрос, а игрок проигнорировал его и сразу спросил своё — скажи: "Сначала ответь на мой вопрос: '${lastAiQuestionText}'!", а в "aiQuestion" верни null.

4. ЕСЛИ ИГРОК ТОЛЬКО ОТВЕТИЛ ("Да", "Нет", "Частично"):
   Прими ответ, учти в дедукции и напиши: "Принято. Теперь твоя очередь — задавай свой вопрос.". В "aiQuestion" верни null.

5. ЕСЛИ ИГРОК НАЗВАЛ СВОЕГО ГЕРОЯ:
   Игрок раскрыл себя. Поставь id в "guessId" и напиши победную реплику в выбранном тоне.

6. ТВОЙ ВСТРЕЧНЫЙ ВОПРОС:
   Задавай только наводящие закрытые вопросы (по плащу, маске, оружию, полету, цвету, полу).
   Не повторяй вопросы из истории.

ОТВЕТЬ СТРОГО В ВИДЕ JSON:
{
  "answer": "твой ответ",
  "aiQuestion": "твой закрытый вопрос (или null)",
  "guessId": null
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
          usedModel: model,
          wasSwitched: model !== modelsQueue[0]
        });
      }
    } catch (err: any) {
      lastError = err.message;
    }
  }

  // Если сервера перегружены — ВОПРОС НЕ ЗАДАЕТСЯ
  return res.status(503).json({
    error: `Серверы временно заняты (${lastError}). Повторите попытку через секунду.`,
    isBusy: true
  });
}
