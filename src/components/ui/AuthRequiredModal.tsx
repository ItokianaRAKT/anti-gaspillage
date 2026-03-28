import { useNavigate } from "react-router-dom";

interface Props {
  onClose: () => void;
}

function AuthRequiredModal({ onClose }: Props) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-6">
        
        <div className="text-5xl">🔒</div>

        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800 mb-2">
            Connexion requise
          </p>
          <p className="text-gray-500 text-sm">
            Vous devez être connecté pour publier un produit.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Se connecter
          </button>
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            Annuler
          </button>
        </div>

      </div>
    </div>
  );
}

export default AuthRequiredModal; 