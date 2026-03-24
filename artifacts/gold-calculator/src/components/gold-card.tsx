import { motion } from "framer-motion";
import type { GoldKaratPrice } from "@workspace/api-client-react/src/generated/api.schemas";

interface GoldCardProps {
  data: GoldKaratPrice;
  index: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value) + ' ج.م';
};

export function GoldCard({ data, index }: GoldCardProps) {
  // Map karats to specific visual flares
  const getKaratVisuals = (karat: number) => {
    switch(karat) {
      case 24: return "from-amber-200 via-yellow-400 to-amber-600";
      case 21: return "from-amber-300 via-amber-500 to-amber-700";
      case 18: return "from-yellow-500 via-amber-600 to-orange-700";
      default: return "from-gold-300 to-gold-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="relative group h-full"
    >
      {/* Animated glowing border effect on hover */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-gold-500/0 via-gold-400/30 to-gold-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      <div className="relative h-full flex flex-col glass-card rounded-2xl p-6 lg:p-8 overflow-hidden bg-black/40 border border-gold-500/20 shadow-2xl shadow-black/80 group-hover:border-gold-500/40 transition-colors">
        {/* Visible top gradient border */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600 opacity-80" />
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-gold opacity-15 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />

        <div className="flex justify-between items-start mb-8 border-b border-gold-500/10 pb-6">
          <div>
            <h3 className="text-sm font-bold text-gold-400 uppercase tracking-widest mb-2">عيار</h3>
            <div className="flex items-baseline gap-2">
              <span className={`text-6xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r ${getKaratVisuals(data.karat)} drop-shadow-sm`}>
                {data.karat}
              </span>
              <span className="text-2xl text-gold-500 font-display font-bold">K</span>
            </div>
          </div>
          <div className="text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold-900/50 border border-gold-500/20 text-xs font-bold text-gold-300 shadow-inner">
              نقاء {(data.purity * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-end space-y-6">
          <div className="space-y-2 bg-black/20 p-4 rounded-xl border border-white/5">
            <p className="text-sm font-semibold text-gold-200/60">السعر الصافي للجرام</p>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-md">
              {formatCurrency(data.pricePerGramEgp)}
            </p>
          </div>

          {data.pricePerGramWithWorkmanshipEgp > data.pricePerGramEgp && (
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-gold-400">السعر شامل المصنعية</p>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500"></span>
                </span>
              </div>
              <p className="text-3xl font-bold text-gold-200 tracking-tight">
                {formatCurrency(data.pricePerGramWithWorkmanshipEgp)}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
