

type TeamPodium = {
  position: number;
  name: string;
  points: number;
  streak: number;
};

type TeamList = {
  position: number;
  name: string;
  points: number;
};

const podiumTeams: TeamPodium[] = [
  { position: 2, name: "Anonimous 2", points: 6970, streak: 10 },
  { position: 1, name: "Anonimous 1", points: 7210, streak: 20 },
  { position: 3, name: "Anonimous 3", points: 6520, streak: 5 },
];

const otherTeams: TeamList[] = [
  { position: 4, name: "Anonimous 4", points: 5875 },
  { position: 5, name: "Anonimous 5", points: 5800 },
  { position: 6, name: "Anonimous 6", points: 5535 },
  { position: 7, name: "Anonimous 7", points: 5534 },
  { position: 8, name: "Anonimous 8", points: 5180 },
  { position: 9, name: "Anonimous 9", points: 4921 },
  { position: 10, name: "Anonimous 10", points: 4910 },
];

const RankingSection = () => {
  return (
    <section className="ranking-card">
      <div className="ranking-header">
        <div>
          <h2>Classement</h2>
          <div className="section-underline"></div>
        </div>
        <span className="ranking-star">☆</span>
      </div>

      <div className="podium">
        {podiumTeams.map((team) => (
          <div
            key={team.position}
            className={`podium-card ${team.position === 1 ? "first" : ""}`}
          >
            <div className="podium-logo">
              <div className="leaf-circle">🌿</div>
            </div>

            <div className="podium-body">
              <p className="team-name">{team.name}</p>
              <p className="team-points">{team.points}pts</p>
            </div>

            <div className="podium-footer">
              <span>#{team.position}</span>
              <span>{team.streak} jour(s) d'affilée</span>
            </div>
          </div>
        ))}
      </div>

      <div className="ranking-list">
        {otherTeams.map((team) => (
          <div key={team.position} className="ranking-row">
            <span className="ranking-position">#{team.position}</span>
            <span className="ranking-team">{team.name}</span>
            <span className="ranking-points">{team.points}pts</span>
          </div>
        ))}
      </div>

      
      <div style={{ 
        backgroundColor: '#fff', 
        borderRadius: '16px', 
        padding: '16px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        
      </div>
    </section>
  );
};

export default RankingSection;
