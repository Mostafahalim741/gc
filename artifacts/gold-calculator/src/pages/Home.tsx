import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Scale, Hammer, RefreshCw, Wifi, WifiOff, Clock, Users } from "lucide-react";
import { useGoldCalculator } from "@/hooks/use-gold-calculator";
import { LuxuryInput } from "@/components/ui/luxury-input";
import { GoldCard } from "@/components/gold-card";

export default function Home() {
  const { inputs, setInputs, query, fetchLiveRates, isFetchingLive, liveError, liveSource, liveFetchedAt } = useGoldCalculator();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitors/hit", { method: "POST" })
      .then(r => r.json())
      .then(d => setVisitorCount(d.count))
      .catch(() => {
        fetch("/api/visitors")
          .then(r => r.json())
          .then(d => setVisitorCount(d.count))
          .catch(() => {});
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : parseFloat(value);
    setInputs(prev => ({
      ...prev,
      [name]: isNaN(numValue) ? prev[name as keyof typeof inputs] : numValue
    }));
  };

  const formattedFetchTime = liveFetchedAt
    ? new Intl.DateTimeFormat('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(liveFetchedAt))
    : null;

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-gold-500/30 selection:text-gold-100 pt-16">
      
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src={`${import.meta.env.BASE_URL}images/gold-bg.png`} 
          alt="Luxury Gold Background" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/90 to-background"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 max-w-7xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-6 pt-4"
        >
          <div className="flex justify-center mb-8">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full glass-card p-2 flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.2)] bg-black/50 z-20">
              <img 
                src={`${import.meta.env.BASE_URL}images/gold-coin.png`} 
                alt="Gold Coin" 
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] animate-[spin_15s_linear_infinite]"
              />
              <div className="absolute inset-0 rounded-full border-2 border-gold-500/40"></div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-gradient-gold pb-2 drop-shadow-sm">
            حاسبة الذهب الذكية
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
            احسب أسعار الذهب الفورية في مصر بدقة بناءً على السعر العالمي للأونصة وسعر صرف الدولار في البنوك الرسمية.
          </p>
        </motion.div>

        {/* Ad Banner */}
        <motion.a
          href="https://www.noon.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="block mb-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 hover:scale-[1.01] transition-transform duration-300"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/noon-ad.jpeg`}
            alt="نون السعودية والإمارات - كود خصم DWDT"
            className="w-full object-cover"
          />
        </motion.a>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Input Controls Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 glass-card rounded-3xl p-6 sm:p-8 border-t border-gold-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-gold-400 via-gold-600 to-transparent"></div>
            
            <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-400">
                <Scale className="w-5 h-5" />
              </div>
              محددات الحساب
            </h2>

            {/* Live Fetch Button */}
            <motion.button
              onClick={fetchLiveRates}
              disabled={isFetchingLive}
              whileTap={{ scale: 0.97 }}
              className="w-full mb-8 py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300
                bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 hover:from-gold-500 hover:via-gold-300 hover:to-gold-500
                text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] disabled:opacity-60 disabled:cursor-not-allowed border border-gold-300/50"
            >
              {isFetchingLive ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  جاري جلب الأسعار من الإنترنت...
                </>
              ) : (
                <>
                  <Wifi className="w-5 h-5" />
                  جلب الأسعار الحية تلقائياً
                </>
              )}
            </motion.button>

            {/* Live fetch status */}
            {liveError && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-xs text-destructive"
              >
                <WifiOff className="w-4 h-4 flex-shrink-0" />
                تعذر الاتصال بالإنترنت. يمكنك إدخال الأرقام يدوياً.
              </motion.div>
            )}

            {formattedFetchTime && !liveError && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-2 text-xs text-green-400"
              >
                <Clock className="w-4 h-4 flex-shrink-0" />
                تم تحديث الأسعار الساعة {formattedFetchTime}
              </motion.div>
            )}

            <div className="space-y-6">
              <LuxuryInput
                label="سعر الدولار (بنك مصر)"
                name="usdRate"
                type="number"
                step="0.01"
                min="0"
                value={inputs.usdRate || ''}
                onChange={handleInputChange}
                icon={<DollarSign className="w-5 h-5" />}
                suffix="ج.م"
              />

              <LuxuryInput
                label="سعر الأونصة العالمي"
                name="ouncePriceUsd"
                type="number"
                step="0.1"
                min="0"
                value={inputs.ouncePriceUsd || ''}
                onChange={handleInputChange}
                icon={<DollarSign className="w-5 h-5" />}
                suffix="$"
              />

              <div className="pt-6 border-t border-white/5">
                <LuxuryInput
                  label="المصنعية للجرام (اختياري)"
                  name="workmanship"
                  type="number"
                  step="1"
                  min="0"
                  value={inputs.workmanship || ''}
                  onChange={handleInputChange}
                  icon={<Hammer className="w-5 h-5" />}
                  suffix="ج.م"
                />
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-gold-950/30 border border-gold-500/10">
              <p className="text-xs text-gold-200/60 leading-relaxed flex items-start gap-2">
                <span className="mt-0.5 block w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0"></span>
                يتم تحديث الحسابات تلقائياً عند تغيير القيم. الأسعار المعروضة هي أسعار استرشادية تقريبية.
                {liveSource && <span className="block mt-1 opacity-50">المصدر: {liveSource}</span>}
              </p>
            </div>
          </motion.div>

          {/* Results Display */}
          <div className="lg:col-span-8">
            {query.isLoading ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-4 glass-card rounded-3xl border-dashed border-white/10">
                <RefreshCw className="w-10 h-10 text-gold-400 animate-spin" />
                <p className="text-gold-200/70 font-medium animate-pulse">جاري حساب الأسعار بدقة...</p>
              </div>
            ) : query.isError ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 glass-card rounded-3xl border-destructive/30 bg-destructive/5">
                <p className="text-xl font-bold text-destructive mb-2">عذراً، حدث خطأ في الحساب</p>
                <p className="text-muted-foreground text-center">يرجى التأكد من صحة الأرقام المدخلة والمحاولة مرة أخرى.</p>
              </div>
            ) : query.data ? (
              <div className="space-y-8">
                
                {/* Meta Results Banner */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap items-center gap-6 p-6 lg:p-8 glass-card rounded-2xl border border-gold-500/30 bg-gradient-to-br from-black/80 to-gold-950/40 shadow-xl shadow-black/60 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 blur-3xl rounded-full" />
                  
                  <div className="flex-1 min-w-[200px] relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                      <p className="text-sm font-bold text-gold-200/80 uppercase tracking-wide">سعر الأونصة بالجنيه</p>
                    </div>
                    <p className="text-3xl font-display font-bold text-white drop-shadow-md">
                      {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(query.data.ouncePriceEgp)} ج.م
                    </p>
                  </div>
                  
                  <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold-500/50 to-transparent hidden sm:block relative z-10"></div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent sm:hidden relative z-10 my-2"></div>
                  
                  <div className="flex-1 min-w-[200px] relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-gold-400"></div>
                      <p className="text-sm font-bold text-gold-200/80 uppercase tracking-wide">سعر جرام 24 الصافي</p>
                    </div>
                    <p className="text-3xl font-display font-bold text-gold-300 drop-shadow-md">
                      {new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(query.data.pricePerGramEgp24k)}
                    </p>
                  </div>
                </motion.div>

                {/* Grid of Karat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                  {[...(query.data.karats || [])]
                    .sort((a, b) => b.karat - a.karat)
                    .map((item, index) => (
                    <GoldCard key={item.karat} data={item} index={index} />
                  ))}
                </div>

              </div>
            ) : null}
          </div>

        </div>
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-gold-500/20 text-center relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>

          {/* Visitor Counter */}
          {visitorCount !== null && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full bg-gold-500/10 border border-gold-500/20"
            >
              <Users className="w-4 h-4 text-gold-400" />
              <span className="text-sm font-bold text-gold-300">
                {new Intl.NumberFormat('en-US').format(visitorCount)}
              </span>
              <span className="text-xs text-gold-200/60">زيارة</span>
            </motion.div>
          )}

          <p className="text-sm font-medium text-gold-200/60 tracking-widest uppercase">
            صمم بواسطة{" "}
            <a
              href="https://www.facebook.com/0mostafaali/?locale=ar_AR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 font-bold hover:text-gold-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
            >
              ENG Mostafa
            </a>
          </p>
        </motion.div>

      </div>
    </div>
  );
}
