import pdp from "../../assets/prodilPdp.jpg";
import fond from "../../assets/fondProfil.jpg";

import { useAuthStore } from "../../store/auth.store";
import { useEffect } from "react";

const HeroProfil = () => {
  const { user, fetchUser } = useAuthStore();

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  if (!user) return <p>Chargement...</p>;

  return (
    <section className="hero-profil">
      <div className="hero-banner">
        <img src={fond} alt="Fond du profil" className="hero-banner-img" />
      </div>
      <div className="hero-card">
        <div className="hero-badge">Actif</div>
        <div className="hero-avatar-wrapper">
          <img src={pdp} alt="Photo de profil" className="hero-avatar" />
        </div>
        <div className="hero-card-body">
          <h1 className="hero-name">{user.first_name} {user.last_name}</h1>
          <div className="hero-line"></div>
        </div>
        <div className="hero-card-footer">
          <div className="hero-footer-left">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact:</strong> {user.tel1_user}</p>
          </div>
          <div className="hero-footer-right">
            <p><strong>Adresse: </strong>{user.address_user}</p>
            <p>...</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroProfil;