/**
 * Toast — Redesign premium
 * - Icônes Lucide React
 * - Animations d'entrée/sortie plus fluides
 * - Design plus épuré
 */

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  const isSuccess = type === "success";

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0 -translate-x-1/2" : "opacity-0 translate-y-4 -translate-x-1/2"
      } ${isSuccess ? "bg-gray-900" : "bg-red-600"} text-white`}
      style={{ minWidth: "280px", maxWidth: "90vw" }}
    >
      {isSuccess
        ? <CheckCircle size={18} className="text-green-400 shrink-0" />
        : <XCircle size={18} className="text-red-200 shrink-0" />
      }
      <p className="text-sm font-medium flex-1 font-contenu">{message}</p>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        className="text-white/50 hover:text-white transition-colors ml-1 shrink-0"
      >
        <X size={15} />
      </button>

      {/* Barre de progression */}
      <div className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl overflow-hidden w-full">
        <div
          className={`h-full ${isSuccess ? "bg-green-500" : "bg-red-300"}`}
          style={{ animation: `shrink ${duration}ms linear forwards` }}
        />
      </div>

      <style>{`@keyframes shrink { from { width: 100%; } to { width: 0%; } }`}</style>
    </div>
  );
}

export default Toast;
