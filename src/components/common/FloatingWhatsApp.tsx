import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppProps {
  phone?: string;
  message?: string;
}

export function FloatingWhatsApp({
  phone = "442080505527",
  message = "Hi Ten Piece — I'd like to chat about a project.",
}: FloatingWhatsAppProps) {
  const href = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full text-white shadow-xl shadow-emerald-500/40 md:bottom-8 md:right-8"
      style={{
        background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
      }}
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400" />
      <span className="absolute inset-0 rounded-full ring-2 ring-white/40" />
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        className="relative z-10"
        aria-hidden
      >
        <path d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.36-1.66a11.9 11.9 0 0 0 5.7 1.45h.01c6.55 0 11.86-5.3 11.86-11.85 0-3.17-1.23-6.14-3.41-8.46zM12.06 21.7h-.01a9.85 9.85 0 0 1-5.02-1.38l-.36-.22-3.77.99 1.01-3.68-.23-.38a9.85 9.85 0 1 1 8.38 4.67zm5.4-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48a9.03 9.03 0 0 1-1.67-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </motion.a>
  );
}
