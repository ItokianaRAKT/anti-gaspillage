/**
 * Profil — Redesign premium (Tailwind pur, sans profil.css)
 * - Import profil.css supprimé : tout est en Tailwind
 * - Layout grid responsive cohérent
 */

import HeroProfil    from "../features/heroProfil";
import ProfilInfo    from "../features/profilInfo";
import BadgeCard     from "../features/badgeCard";
import RankingSection from "../features/rankingSection";
import StatHebdo     from "../features/statHebdo";

const Profil = () => {
  return (
    <main className="w-full min-h-screen bg-gray-50 pt-16">
      <HeroProfil />

      <section className="w-full max-w-5xl mx-auto px-4 pb-16">
        {/* Grille : info + badge */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1.2fr] gap-5 mb-5 items-start">
          <ProfilInfo />
          <BadgeCard />
        </div>

        {/* Stats hebdo */}
        <StatHebdo />

        {/* Classement */}
        <RankingSection />
      </section>
    </main>
  );
};

export default Profil;
