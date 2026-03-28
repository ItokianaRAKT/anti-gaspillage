import { BarChart } from '@mui/x-charts/BarChart';

const uData = [12, 8, 15, 20, 10, 18, 14]; 
const xLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];


const StatHebdo = () => {
  return (
    <section className="ranking-card mb-7">
      <div className="ranking-header">
        <div>
          <h2>Statistiques</h2>
          <div className="section-underline"></div>
        </div>
        <span className="ranking-star">☆</span>
      </div>


      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        background: 'linear-gradient(145deg, #ffffff, #f9f9f9)', 
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      }}>
        <div style={{ marginBottom: '10px', paddingLeft: '10px' }}>
          <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#2e7d32', fontWeight: 700 }}>
            Performance Hebdomadaire
          </h3>
          <p style={{ margin: 0, fontSize: '1rem', color: '#666' }}>Nombre de produits vendus</p>
        </div>

        <BarChart
          width={800}
          height={400}
          series={[
            { 
              data: uData, 
              label: 'Ventes', 
              color: '#4caf50',
            }
          ]}
          xAxis={[{ 
            scaleType: 'band', 
            data: xLabels,
            categoryGapRatio: 0.3, 
          }]}
          yAxis={[{
            min: 0,
            max: 20,
            tickNumber: 5, 
          }]}
          sx={{
            '.MuiBarElement-root': {
              rx: 3, 
            },
            '.MuiChartsGrid-line': {
              strokeDasharray: '5 5', 
              stroke: '#e0e0e0',
            },
          }}
          grid={{ horizontal: true }} 
          margin={{ left: 40, right: 20, top: 20, bottom: 30 }}
        />
      </div>
    </section>
  );
};

export default StatHebdo;
