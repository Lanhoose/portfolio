import { useEffect, useMemo, useState } from 'react';

function formatUptime(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function DeveloperPanel({ xp = 0, xpLevel = 1, conquistas = [], totalConquistas = 0, tempoSegundos = 0, musicaAtiva = false, idioma = 'pt' }) {
  const [aberto, setAberto] = useState(false);
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    if (!aberto) return undefined;
    const timer = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(timer);
  }, [aberto]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        setAberto((value) => !value);
      }
      if (event.key === 'Escape') setAberto(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const ambiente = useMemo(() => ({
    navegador: navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : navigator.userAgent.includes('Safari') ? 'Safari' : 'Browser',
    sistema: navigator.platform || 'Web',
    tela: `${window.innerWidth} × ${window.innerHeight}`,
    idioma: idioma === 'pt' ? 'Português' : idioma,
    online: navigator.onLine,
  }), [idioma]);

  const progresso = xp % 100;

  return (
    <>
      <button
        className="developer-panel-trigger"
        type="button"
        onClick={() => setAberto(true)}
        aria-label="Abrir painel de desenvolvedor"
        title="Painel de Desenvolvedor (Ctrl + Shift + D)"
      >
        <span className="developer-trigger-dot" />
        DEV
      </button>

      {aberto && (
        <div className="developer-panel-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setAberto(false); }}>
          <section className="developer-panel" role="dialog" aria-modal="true" aria-label="Painel de Desenvolvedor">
            <div className="developer-panel-header">
              <div>
                <span className="developer-kicker">SYSTEM / DEVTOOLS</span>
                <h2>Developer Panel</h2>
                <p>Monitoramento em tempo real do portfólio.</p>
              </div>
              <button className="developer-close" type="button" onClick={() => setAberto(false)} aria-label="Fechar">×</button>
            </div>

            <div className="developer-status-line">
              <span><i className="dev-online-dot" /> SYSTEM ONLINE</span>
              <span className="dev-clock">{agora.toLocaleTimeString('pt-BR')}</span>
            </div>

            <div className="developer-grid">
              <article className="developer-card developer-card-highlight">
                <span className="developer-card-label">LEVEL</span>
                <strong>LV.{xpLevel}</strong>
                <small>{xp} XP total</small>
                <div className="developer-progress"><span style={{ width: `${progresso}%` }} /></div>
                <small>{100 - progresso} XP para o próximo nível</small>
              </article>

              <article className="developer-card">
                <span className="developer-card-label">ACHIEVEMENTS</span>
                <strong>{conquistas.length}/{totalConquistas}</strong>
                <small>{totalConquistas ? Math.round((conquistas.length / totalConquistas) * 100) : 0}% desbloqueado</small>
              </article>

              <article className="developer-card">
                <span className="developer-card-label">UPTIME</span>
                <strong>{formatUptime(tempoSegundos)}</strong>
                <small>sessão atual</small>
              </article>

              <article className="developer-card">
                <span className="developer-card-label">AUDIO ENGINE</span>
                <strong>{musicaAtiva ? 'PLAYING' : 'IDLE'}</strong>
                <small>{musicaAtiva ? 'trilha ativa' : 'nenhuma faixa tocando'}</small>
              </article>
            </div>

            <div className="developer-section-title">ENVIRONMENT</div>
            <div className="developer-info-grid">
              <div><span>Browser</span><b>{ambiente.navegador}</b></div>
              <div><span>Platform</span><b>{ambiente.sistema}</b></div>
              <div><span>Viewport</span><b>{ambiente.tela}</b></div>
              <div><span>Language</span><b>{ambiente.idioma}</b></div>
              <div><span>Connection</span><b className={ambiente.online ? 'dev-ok' : 'dev-warn'}>{ambiente.online ? 'ONLINE' : 'OFFLINE'}</b></div>
              <div><span>Build</span><b>JOSE.WEB 2026</b></div>
            </div>

            <div className="developer-section-title">STACK</div>
            <div className="developer-stack">
              {['React', 'JavaScript', 'Vite', 'CSS3', 'Firebase', 'GitHub'].map((tech) => <span key={tech}>{tech}</span>)}
            </div>

            <div className="developer-panel-footer">
              <span>⌨ Ctrl + Shift + D</span>
              <span>ESC para fechar</span>
              <span>● SECURE SESSION</span>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
