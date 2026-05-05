/**
 * StatHebdo — Redesign premium (Tailwind pur)
 * - Icônes Lucide React (remplacement emoji ☆)
 * - En-tête section cohérente
 * - Wrapper du chart MUI X avec style raffiné
 */

import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";
import { BarChart2 } from "lucide-react";

const xLabels  = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const uData    = [12, 8, 15, 20, 10, 18, 14];
const commuData= [20, 12, 21, 15, 34, 32, 30];

const StatHebdo = () => {
  return (
    <section className="bg-white border-2 border-green-100 rounded-3xl shadow-sm p-6 md:p-7 mb-6">

      {/* En-tête */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primaryGreen/10 flex items-center justify-center">
            <BarChart2 size={18} className="text-primaryGreen" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 font-titre">Statistiques hebdomadaires</h2>
        </div>
      </div>
      <div className="w-10 h-1 bg-primaryGreen/40 rounded-full mb-6" />

      {/* Sous-titre */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 font-titre">Comparaison de performance</p>
        <p className="text-xs text-gray-400 font-contenu">Mes partages vs. la communauté cette semaine</p>
      </div>

      {/* Chart */}
      <Box sx={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}>
        <Box sx={{ minWidth: "520px", height: 340 }}>
          <BarChart
            series={[
              { data: uData,     label: "Moi",         color: "#2E6F40" },
              { data: commuData, label: "Communauté",   color: "#a5d6a7" },
            ]}
            xAxis={[{ scaleType: "band", data: xLabels, categoryGapRatio: 0.4 }]}
            height={340}
            margin={{ left: 40, right: 20, top: 50, bottom: 30 }}
            slotProps={{
              legend: {
                direction: "horizontal",
                position: { vertical: "top", horizontal: "center" },
              },
            }}
            sx={{
              ".MuiBarElement-root": { rx: 5 },
              ".MuiChartsGrid-line": { strokeDasharray: "5 5", stroke: "#f3f4f6" },
            }}
            grid={{ horizontal: true }}
          />
        </Box>
      </Box>
    </section>
  );
};

export default StatHebdo;
