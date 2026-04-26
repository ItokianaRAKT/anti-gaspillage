import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Entrée
    const showTimer = setTimeout(() => setVisible(true), 10);
    // Sortie
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // attendre l'animation de sortie
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const isSuccess = type === "success";

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 z-50 flex items-center gap-3
        px-5 py-4 rounded-2xl shadow-xl
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0 -translate-x-1/2" : "opacity-0 translate-y-4 -translate-x-1/2"}
        ${isSuccess ? "bg-gray-900 text-white" : "bg-red-500 text-white"}
      `}
      style={{ minWidth: "280px", maxWidth: "90vw" }}
    >
      {/* Icône */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold
          ${isSuccess ? "bg-green-500" : "bg-red-300"}`}
      >
        {isSuccess ? "✓" : "✕"}
      </div>

      {/* Message */}
      <p className="text-sm font-medium flex-1">{message}</p>

      {/* Bouton fermer */}
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }} className="text-white/60 hover:text-white text-lg leading-none ml-2">
        ×
      </button>

      {/* Barre de progression */}
      <div className="absolute bottom-0 left-0 h-1 rounded-b-2xl overflow-hidden w-full">
        <div
          className={`h-full ${isSuccess ? "bg-green-500" : "bg-red-300"}`}
          style={{
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

export default Toast;