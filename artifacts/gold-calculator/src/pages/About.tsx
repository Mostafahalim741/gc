import { motion } from "framer-motion";
import { Gem, Target, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "أسعار فورية",
    desc: "نجلب سعر الذهب العالمي وسعر الدولار في الوقت الفعلي من Yahoo Finance.",
  },
  {
    icon: Target,
    title: "دقة عالية",
    desc: "نستخدم المعادلة الرسمية المبنية على سعر الأونصة والصرف لحساب جميع العيارات.",
  },
  {
    icon: Shield,
    title: "موثوق ومجاني",
    desc: "الموقع مجاني تماماً بدون إعلانات مزعجة، صُمّم لمساعدة المصريين على معرفة سعر الذهب بدقة.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Profile Photo */}
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-gold-400/60 ring-offset-4 ring-offset-background shadow-2xl shadow-gold-500/20">
              <img
                src="/images/mustafa-profile.jpeg"
                alt="Mustafa Abdelhaleem"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
              <Gem className="w-4 h-4 text-gold-400" />
            </div>
          </div>

          <h1 className="font-display text-4xl font-bold text-gold-400 mb-2">عنّا</h1>
          <p className="text-gold-300 font-bold text-lg mb-4">Mustafa Abdelhaleem</p>
          <p className="text-gold-200/70 text-lg leading-relaxed">
            حاسبة الذهب الذكية هي أداة مصرية متخصصة في حساب أسعار الذهب بالجنيه المصري
            لجميع العيارات (18، 21، 24 قيراط) بشكل لحظي ودقيق.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gold-500/5 border border-gold-500/20 rounded-2xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 mb-4">
                <f.icon className="w-6 h-6 text-gold-400" />
              </div>
              <h3 className="font-bold text-gold-300 mb-2">{f.title}</h3>
              <p className="text-sm text-gold-200/60 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gold-500/5 border border-gold-500/20 rounded-2xl p-8"
        >
          <h2 className="font-display text-2xl font-bold text-gold-400 mb-4">من نحن؟</h2>
          <p className="text-gold-200/70 leading-relaxed mb-4">
            صمّم هذا الموقع <span className="text-gold-400 font-bold">ENG Mostafa</span>، مهندس مصري يؤمن بأن
            كل شخص يستحق الوصول لأسعار الذهب الحقيقية بدون تعقيد أو غموض.
          </p>
          <p className="text-gold-200/70 leading-relaxed">
            الموقع يعتمد على بيانات Yahoo Finance كمصدر موثوق للأسعار العالمية،
            مع إمكانية إدخال سعر الدولار والأونصة يدوياً للمقارنة.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
