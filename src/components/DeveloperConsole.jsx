import { useEffect, useRef, useState } from 'react';

export default function DeveloperConsole({ aberto, onFechar, onComando, retorno }) {
  const [input, setInput] = useState('');
  const [historico, setHistorico] = useState([
    '> JOSE.WEB DEVELOPER CONSOLE [ONLINE]',
    '> Digite /help para listar os comandos.'
  ]);
  const ref = useRef(null);

  useEffect(() => { if (aberto) setTimeout(() => ref.current?.focus(), 50); }, [aberto]);
  useEffect(() => { if (retorno) setHistorico(h => [...h, retorno]); }, [retorno]);

  if (!aberto) return null;

  const enviar = () => {
    const cmd = input.trim();
    if (!cmd) return;
    setHistorico(h => [...h, `> ${cmd}`]);
    onComando(cmd);
    setInput('');
  };

  return (
    <div className="developer-console-overlay" onMouseDown={e => e.target === e.currentTarget && onFechar()}>
      <div className="developer-console">
        <div className="developer-console-header">
          <div><span className="console-dot" /> <strong>JOSE.WEB</strong> <small>DEVELOPER CONSOLE</small></div>
          <button onClick={onFechar} aria-label="Fechar console">×</button>
        </div>
        <div className="developer-console-body">
          <div className="console-status-line">SYSTEM :: ONLINE &nbsp;|&nbsp; SESSION :: ACTIVE &nbsp;|&nbsp; ACCESS :: USER</div>
          <div className="console-history">
            {historico.slice(-16).map((line, i) => <div key={i}>{line}</div>)}
          </div>
          <div className="console-input-row">
            <span>root@jose.web:~$</span>
            <input ref={ref} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && enviar()} placeholder="/help" />
            <button onClick={enviar}>EXEC</button>
          </div>
        </div>
        <div className="developer-console-footer">ESC fechar · CTRL+SHIFT+D abrir/fechar · /help comandos</div>
      </div>
    </div>
  );
}
