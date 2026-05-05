/**
 * RankingSection — Redesign premium (Tailwind pur)
 * - Icônes Lucide React (remplacement emoji 🌿 et ☆)
 * - Podium avec médailles visuelles
 * - Liste classement plus lisible
 */

import { Trophy, Medal, Star, Flame } from "lucide-react";

type TeamPodium = { position: number; name: string; points: number; streak: number };
type TeamList   = { position: number; name: string; points: number };

const podiumTeams: TeamPodium[] = [
  { position: 2, name: "Anonimous 2", points: 6970, streak: 10 },
  { position: 1, name: "Anonimous 1", points: 7210, streak: 20 },
  { position: 3, name: "Anonimous 3", points: 6520, streak:  5 },
];

const otherTeams: TeamList[] = [
  { position: 4,  name: "Anonimous 4",  points: 5875 },
  { position: 5,  name: "Anonimous 5",  points: 5800 },
  { position: 6,  name: "Anonimous 6",  points: 5535 },
  { position: 7,  name: "Anonimous 7",  points: 5534 },
  { position: 8,  name: "Anonimous 8",  points: 5180 },
  { position: 9,  name: "Anonimous 9",  points: 4921 },
  { position: 10, name: "Anonimous 10", points: 4910 },
];

const podiumMeta: Record<number, { label: string; bg: string; ring: string; icon: React.ElementType; iconColor: string }> = {
  1: { label: "Or",    bg: "bg-amber-50",      ring: "ring-amber-300", icon: Trophy, iconColor: "text-amber-400" },
  2: { label: "Argent",bg: "bg-slate-50",       ring: "ring-slate-300", icon: Medal,  iconColor: "text-slate-400" },
  3: { label: "Bronze",bg: "bg-orange-50",     ring: "ring-orange-300",icon: Medal,  iconColor: "text-orange-400" },
};

const RankingSection = () => {
  return (
    <section className="bg-white border-2 border-green-100 rounded-3xl shadow-sm p-6 md:p-7">

      {/* En-tête */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primaryGreen/10 flex items-center justify-center">
            <Trophy size={18} className="text-primaryGreen" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 font-titre">Classement trimestriel</h2>
        </div>
        <Star size={20} className="text-primaryGreen/40" />
      </div>
      <div className="w-10 h-1 bg-primaryGreen/40 rounded-full mb-7" />

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 mb-6 items-end">
        {podiumTeams.map((team) => {
          const meta = podiumMeta[team.position];
          const Icon = meta.icon;
          const isFirst = team.position === 1;
          return (
            <div
              key={team.position}
              className={`flex flex-col items-center text-center rounded-2xl border p-3 md:p-4 transition-transform ${
                isFirst ? `${meta.bg} ring-2 ${meta.ring} scale-105` : `${meta.bg} border-gray-100`
              }`}
            >
              <Icon size={isFirst ? 28 : 22} className={`${meta.iconColor} mb-2`} />
              <p className="text-xs font-semibold text-gray-700 font-contenu mb-0.5 truncate w-full">{team.name}</p>
              <p className={`font-bold font-titre ${isFirst ? "text-xl text-gray-900" : "text-lg text-gray-700"}`}>
                {team.points.toLocaleString()}<span className="text-xs font-normal text-gray-400">pts</span>
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-orange-500 font-medium font-contenu">
                <Flame size={11} />
                {team.streak}j
              </div>
              <span className="mt-2 text-[10px] font-bold text-gray-400">#{team.position}</span>
            </div>
          );
        })}
      </div>

      {/* Liste autres */}
      <div className="flex flex-col gap-2">
        {otherTeams.map((team) => (
          <div
            key={team.position}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primaryGreen/8 hover:bg-primaryGreen/12 transition-colors"
          >
            <span className="text-xs font-bold text-primaryGreen w-7 text-center font-titre">#{team.position}</span>
            <span className="flex-1 text-sm font-medium text-gray-700 font-contenu">{team.name}</span>
            <span className="text-sm font-bold text-primaryGreen font-titre">
              {team.points.toLocaleString()}<span className="text-xs font-normal text-gray-400">pts</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RankingSection;
