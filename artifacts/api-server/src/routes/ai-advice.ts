import { Router, type IRouter } from "express";
import OpenAI from "openai";

const router: IRouter = Router();

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

router.post("/ai/advice", async (req, res) => {
  const { ouncePriceUsd, usdToEgp, karat24Price, karat21Price, karat18Price } = req.body as {
    ouncePriceUsd: number;
    usdToEgp: number;
    karat24Price: number;
    karat21Price: number;
    karat18Price: number;
  };

  if (!ouncePriceUsd || !usdToEgp) {
    res.status(400).json({ error: "بيانات الأسعار مطلوبة" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 8192,
      stream: true,
      messages: [
        {
          role: "system",
          content: `أنت خبير استثمار في الذهب متخصص في السوق المصري. تقدم نصائح استثمارية دقيقة ومفيدة باللغة العربية.
          
قواعد مهمة:
- اكتب بالعربية الفصحى البسيطة
- كن دقيقاً ومختصراً (5-7 نقاط)
- استند دائماً إلى الأرقام الفعلية المقدمة
- وضح هل السعر الحالي مناسب للشراء أم الانتظار
- اذكر العيار الأنسب للاستثمار
- قدم توقعاً قصير المدى (أسبوع إلى شهر)
- اختم بتحذير: النصائح للأغراض التعليمية فقط`,
        },
        {
          role: "user",
          content: `بناءً على بيانات الذهب الحالية:
- سعر الأونصة العالمي: ${ouncePriceUsd} دولار
- سعر الدولار مقابل الجنيه: ${usdToEgp} جنيه
- سعر جرام عيار 24: ${karat24Price} جنيه
- سعر جرام عيار 21: ${karat21Price} جنيه
- سعر جرام عيار 18: ${karat18Price} جنيه

قدم لي نصائح استثمارية دقيقة وعملية للمستثمر المصري.`,
        },
      ],
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    req.log.error({ err }, "AI advice error");
    res.write(`data: ${JSON.stringify({ error: "حدث خطأ في توليد النصائح" })}\n\n`);
    res.end();
  }
});

export default router;
