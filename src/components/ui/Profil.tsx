
import HeroProfil from "../features/heroProfil"
import ProfilInfo from "../features/profilInfo";
import BadgeCard from "../features/badgeCard";
import RankingSection from "../features/rankingSection";
import "../../profil.css";
import StatHebdo from "../features/statHebdo";

const Profil = () => {
  return (
    <main className="profil-page">
      <HeroProfil />


      <section className="profil-content">
        <div className="profil-grid">
          <ProfilInfo />
          <BadgeCard />
        </div>
        <StatHebdo />
        <RankingSection />
      </section>
    </main>
  );
};

export default Profil;