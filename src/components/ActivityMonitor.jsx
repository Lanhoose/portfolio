export default function ActivityMonitor({ atividade, tempoSegundos }) {
  const nomes = { about: 'Sobre', projects: 'Projetos', certificates: 'Certificados', contact: 'Contato' };
  const totalVisitas = Object.values(atividade.secoes || {}).reduce((a, b) => a + b, 0);
  const inicio = atividade.inicio || Date.now();
  const sessao = Math.max(0, Math.floor((Date.now() - inicio) / 1000));
  const format = (s) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;
  const barras = Object.entries(nomes).map(([id, nome]) => ({ nome, valor: atividade.secoes?.[id] || 0 }));

  return (
    <div className="activity-monitor">
      <div className="activity-monitor-head">
        <div><span className="activity-pulse" /> ACTIVITY MONITOR</div>
        <span>LIVE</span>
      </div>
      <div className="activity-stats-grid">
        <div><b>{format(Math.max(tempoSegundos, sessao))}</b><small>SESSION</small></div>
        <div><b>{atividade.cliques}</b><small>CLICKS</small></div>
        <div><b>{atividade.projetos}</b><small>PROJECTS</small></div>
        <div><b>{atividade.certificados}</b><small>CERTIFICATES</small></div>
      </div>
      <div className="activity-section-title">SECTION ACTIVITY <span>{totalVisitas} visits</span></div>
      <div className="activity-bars">
        {barras.map(item => {
          const pct = Math.min(100, item.valor * 25);
          return <div className="activity-bar-row" key={item.nome}>
            <span>{item.nome}</span><div><i style={{ width: `${pct}%` }} /></div><em>{item.valor}</em>
          </div>;
        })}
      </div>
    </div>
  );
}
