import pdp from "../../assets/prodilPdp.jpg";
import fond from "../../assets/fondProfil.jpg";

const HeroProfil = () => {
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
          <h1 className="hero-name">John Doe</h1>
          <div className="hero-line"></div>
        </div>

        <div className="hero-card-footer">
          <div className="hero-footer-left">
            <p>
              <strong>Email:</strong> johndoe@gmail.com
            </p>
            <p>
              <strong>Contact:</strong> +261 38 00 000 00
            </p>
          </div>

          <div className="hero-footer-right">
            <p>Ivandry, Antananarivo</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroProfil;