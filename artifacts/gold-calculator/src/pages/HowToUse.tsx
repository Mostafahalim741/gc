import { motion } from "framer-motion";
import { BookOpen, MousePointerClick, RefreshCw, Calculator, Hammer } from "lucide-react";

const steps = [
  {
    icon: RefreshCw,
    num: "01",
    title: "اجلب الأسعار اللحظية",
    desc: 'اضغط على زر "جلب الأسعار اللحظية" في الصفحة الرئيسية ليتم تحديث سعر الدولار وسعر الأونصة تلقائياً من السوق العالمي.',
  },
  {
    icon: MousePointerClick,
    num: "02",
    title: "أو أدخل الأسعار يدوياً",
    desc: "يمكنك إدخال سعر الدولار وسعر الأونصة بالدولار بنفسك إذا كنت تريد المقارنة بين أسعار مختلفة.",
  },
  {
    icon: Hammer,
    num: "03",
    title: "حدد أجرة الصياغة",
    desc: "أدخل أجرة الصياغة (المصنعية) بالجنيه لكل جرام إذا أردت احتسابها ضمن السعر النهائي.",
  },
  {
    icon: Calculator,
    num: "04",
    title: "اقرأ النتائج",
    desc: "ستظهر لك أسعار الذهب لكل عيار (18، 21، 24 قيراط) بالجنيه المصري لكل جرام، مع وبدون أجرة الصياغة.",
  },
];

export default function HowToUse() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 mb-6">
            <BookOpen className="w-8 h-8 text-gold-400" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gold-400 mb-4">كيفية الاستخدام</h1>
          <p className="text-gold-200/70 text-lg leading-relaxed">
            أربع خطوات بسيطة لمعرفة سعر الذهب بدقة تامة
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 mb-14">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5 bg-gold-500/5 border border-gold-500/20 rounded-2xl p-6"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-gold-500/10 border border-gold-500/30">
                <step.icon className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-gold-500/50 mb-1 tracking-widest">{step.num}</div>
                <h3 className="font-bold text-gold-300 mb-2 text-lg">{step.title}</h3>
                <p className="text-gold-200/60 leading-relaxed text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gold-500/5 border border-gold-500/20 rounded-2xl p-8"
        >
          <h2 className="font-display text-xl font-bold text-gold-400 mb-4">المعادلة المستخدمة</h2>
          <div className="bg-black/40 rounded-xl p-4 font-mono text-sm text-gold-300 border border-gold-500/10 leading-relaxed">
            <p>سعر جرام 24 قيراط = (سعر الأونصة × سعر الدولار) ÷ 31.1035</p>
            <p className="mt-2 text-gold-200/50">سعر جرام 21 قيراط = سعر 24 × (21 ÷ 24)</p>
            <p className="mt-1 text-gold-200/50">سعر جرام 18 قيراط = سعر 24 × (18 ÷ 24)</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
