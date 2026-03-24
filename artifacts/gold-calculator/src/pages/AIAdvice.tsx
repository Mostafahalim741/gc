import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, AlertTriangle, RefreshCw, Bot } from "lucide-react";
import { useGoldCalculator } from "@/hooks/use-gold-calculator";

export default function AIAdvice() {
  const { inputs, query } = useGoldCalculator();
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const karat24 = query.data?.karats?.find(k => k.karat === 24);
  const karat21 = query.data?.karats?.find(k => k.karat === 21);
  const karat18 = query.data?.karats?.find(k => k.karat === 18);

  const hasData = !!query.data && !!karat24;

  const fetchAdvice = async () => {
    if (!hasData) return;
    setAdvice("");
    setDone(false);
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ouncePriceUsd: inputs.ouncePriceUsd,
          usdToEgp: inputs.usdRate,
          karat24Price: karat24?.pricePerGramEgp,
          karat21Price: karat21?.pricePerGramEgp,
          karat18Price: karat18?.pricePerGramEgp,
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("no stream");

      while (true) {
        const { done: streamDone, value } = await reader.read();
        if (streamDone) break;

        const text = decoder.decode(value);
        const lines = text.split("\n").filter(l => l.startsWith("data: "));

        for (const line of lines) {
          const json = JSON.parse(line.slice(6));
          if (json.error) { setError(json.error); break; }
          if (json.done) { setDone(true); break; }
          if (json.content) setAdvice(prev => prev + json.content);
        }
      }
    } catch {
      setError("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 mb-6 relative">
            <Bot className="w-8 h-8 text-gold-400" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-400 animate-pulse" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gold-400 mb-3">نصائح استثمارية</h1>
          <p className="text-gold-200/70 text-lg leading-relaxed">
            تحليل ذكي مبني على أسعار الذهب الحالية بمساعدة الذكاء الاصطناعي
          </p>
        </motion.div>

        {/* Current Prices Summary */}
        {hasData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            {[
              { label: "عيار 24", value: karat24?.pricePerGramEgp },
              { label: "عيار 21", value: karat21?.pricePerGramEgp },
              { label: "عيار 18", value: karat18?.pricePerGramEgp },
            ].map(item => (
              <div key={item.label} className="bg-gold-500/5 border border-gold-500/20 rounded-xl p-4 text-center">
                <p className="text-xs text-gold-200/50 mb-1">{item.label}</p>
                <p className="text-lg font-bold text-gold-300">
                  {new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(item.value ?? 0)}
                  <span className="text-xs text-gold-200/50 mr-1">ج.م</span>
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* No Data Warning */}
        {!hasData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5 mb-8"
          >
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <p className="text-yellow-200/80 text-sm">
              يرجى الذهاب للصفحة الرئيسية أولاً لجلب أسعار الذهب الحالية قبل طلب النصائح.
            </p>
          </motion.div>
        )}

        {/* Generate Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <button
            onClick={fetchAdvice}
            disabled={loading || !hasData}
            className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300
              ${hasData && !loading
                ? "bg-gradient-to-l from-gold-600 to-gold-400 text-black hover:from-gold-500 hover:to-gold-300 hover:scale-105 shadow-xl shadow-gold-500/30"
                : "bg-gold-500/10 text-gold-200/40 cursor-not-allowed border border-gold-500/20"
              }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                جاري التحليل...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {done ? "تحليل جديد" : "احصل على نصائح استثمارية"}
                <TrendingUp className="w-5 h-5" />
              </>
            )}
          </button>
        </motion.div>

        {/* AI Response */}
        <AnimatePresence>
          {(advice || loading) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-gradient-to-br from-gold-500/5 to-gold-900/10 border border-gold-500/25 rounded-2xl p-7 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gold-400" />
                </div>
                <span className="text-sm font-bold text-gold-300">تحليل الذكاء الاصطناعي</span>
                {loading && (
                  <span className="flex gap-1 mr-auto">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-gold-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                )}
              </div>

              <div className="text-gold-200/85 leading-relaxed whitespace-pre-wrap text-base font-medium" dir="rtl">
                {advice}
                {loading && <span className="inline-block w-1 h-5 bg-gold-400 animate-pulse mr-1 align-middle" />}
              </div>

              {done && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-5 pt-4 border-t border-gold-500/15 flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 text-gold-500/50 flex-shrink-0" />
                  <p className="text-xs text-gold-200/40">
                    هذه النصائح للأغراض التعليمية فقط وليست توصية استثمارية رسمية.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-4"
          >
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-200/80 text-sm">{error}</p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
