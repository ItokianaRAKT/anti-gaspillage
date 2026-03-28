const BadgeCard = () => {
  return (
    <section className="badge-card">
      <h2 className="badge-title">Badge</h2>
      <div className="section-underline center"></div>

      <div className="badge-content">
        <p>Vous n'avez aucun badge pour le moment :(</p>
        <div className="badge-icon">!</div>
        <p className="badge-footer">Continuez à partager pour débloquer</p>
      </div>
    </section>
  );
};

export default BadgeCard;