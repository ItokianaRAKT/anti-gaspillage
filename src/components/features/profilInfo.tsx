import { useAuthStore } from "../../store/auth.store";

const ProfilInfo = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <section className="info-card">
      <div className="section-title">
        <span className="section-icon">👤</span>
        <h2>Infos</h2>
      </div>
      <div className="section-underline"></div>
      <div className="info-content">
        <p><strong>Date d'inscription: </strong>{new Date(user.date_joined).toLocaleDateString('fr-FR')}</p>
        <p><strong>Produits partagés ces 3 derniers mois: </strong>{user.saved_in_90_days}</p>
        <p><strong>Produits total partagés: </strong>{user.total_product_saved}</p>
      </div>
    </section>
  );
};

export default ProfilInfo;