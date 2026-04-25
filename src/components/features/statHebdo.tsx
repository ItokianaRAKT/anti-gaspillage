import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';

const xLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const uData = [12, 8, 15, 20, 10, 18, 14];
const commuData = [20, 12, 21, 15, 34, 32, 30];

const StatHebdo = () => {
  return (
    <section className="ranking-card mb-7">
      <div className="ranking-header">
        <div>
          <h2>Statistiques Hebdomadaires</h2>
          <div className="section-underline"></div>
        </div>
        <span className="ranking-star">☆</span>
      </div>

      <Box sx={{ 
        marginTop: '30px', 
        padding: { xs: '15px', md: '25px' },
        background: 'linear-gradient(145deg, #ffffff, #f9f9f9)', 
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        width: '100%',
        boxSizing: 'border-box' 
      }}>
        <div style={{ marginBottom: '10px', paddingLeft: '10px' }}>
          <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#2e7d32', fontWeight: 700 }}>
            Comparaison de Performance
          </h3>
          <p style={{ margin: 0, fontSize: '1rem', color: '#666' }}>
            Mes ventes vs Ventes de la communauté
          </p>
        </div>

        <Box sx={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
          <Box sx={{ minWidth: '600px', height: 400 }}>
            <BarChart
              series={[
                { 
                  data: uData, 
                  label: 'Moi', 
                  color: '#2e7d32',
                },
                { 
                  data: commuData, 
                  label: 'Communauté', 
                  color: '#a5d6a7',
                }
              ]}
              xAxis={[{ 
                scaleType: 'band', 
                data: xLabels,
                categoryGapRatio: 0.4, 
              }]}
              height={400}
              margin={{ left: 40, right: 20, top: 60, bottom: 30 }}
              slotProps={{
                legend: {
                  direction: 'horizontal', 
                  position: { vertical: 'top', horizontal: 'center' }, 
                  
                },
              }}
              sx={{
                '.MuiBarElement-root': {
                  rx: 4, 
                },
                '.MuiBarElement-series-auto-1': {
                  stroke: '#2e7d32',
                  strokeWidth: 1,
                  strokeDasharray: '4 3',
                },
                '.MuiChartsGrid-line': {
                  strokeDasharray: '5 5', 
                  stroke: '#e0e0e0',
                },
              }}
              grid={{ horizontal: true }} 
            />
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default StatHebdo;
