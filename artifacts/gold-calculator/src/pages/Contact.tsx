import { motion } from "framer-motion";
import { Facebook, MessageCircle, Mail } from "lucide-react";

const contacts = [
  {
    icon: Facebook,
    label: "صفحة فيسبوك",
    value: "ENG Mostafa",
    href: "https://www.facebook.com/0mostafaali/?locale=ar_AR",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: MessageCircle,
    label: "واتساب",
    value: "تواصل عبر واتساب",
    href: "https://wa.me/966570059211",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: "moahassan98@gmail.com",
    href: "mailto:moahassan98@gmail.com",
    color: "text-gold-400",
    bg: "bg-gold-500/10 border-gold-500/20",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-gold-400/60 ring-offset-4 ring-offset-background shadow-2xl shadow-gold-500/20 mx-auto mb-5">
            <img
              src="/images/mustafa-profile.jpeg"
              alt="Mustafa Abdelhaleem"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="font-display text-4xl font-bold text-gold-400 mb-2">تواصل معنا</h1>
          <p className="text-gold-300 font-bold mb-3">Mustafa Abdelhaleem</p>
          <p className="text-gold-200/70 text-lg leading-relaxed">
            لديك سؤال أو اقتراح؟ نحن نرحب بتواصلك في أي وقت
          </p>
        </motion.div>

        <div className="flex flex-col gap-5">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex items-center gap-5 rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02] ${c.bg}`}
            >
              <div className={`flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-black/30 border border-white/10`}>
                <c.icon className={`w-7 h-7 ${c.color}`} />
              </div>
              <div>
                <p className="text-xs text-gold-200/50 mb-1">{c.label}</p>
                <p className={`font-bold text-lg ${c.color}`}>{c.value}</p>
              </div>
              <span className="mr-auto text-gold-200/30 text-2xl">←</span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gold-200/40 text-sm">
            سنرد عليك في أقرب وقت ممكن · حاسبة الذهب الذكية
          </p>
        </motion.div>

      </div>
    </div>
  );
}
