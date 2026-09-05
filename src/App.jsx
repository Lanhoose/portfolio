import { useEffect, useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Certificados from './components/Certificados';
import Contact from './components/Contact'; 
import Footer from './components/Footer';
import DeveloperPanel from './components/DeveloperPanel';
import Clock from './components/Clock';

import './components/vlibras.js';
import './App.css';
import { CustomCursorPointer, CursorTrailCanvas, FormaCursor, CURSOR_ESTILOS, TRAIL_ESTILOS } from './components/CursorCustom';

import track1 from './assets/Musics/perdas.mp3';
import track2 from './assets/Musics/dan(sukuna).mp3'; 
import track3 from './assets/Musics/fenix(nova).mp3';

import imagemMonster from './assets/IMG/monster.png';

// Componente para carregar e renderizar o Google Translate
function GoogleTranslate() {
  const [lang, setLang] = useState('pt');
  const [langLabel, setLangLabel] = useState('Português');
  const [idiomas, setIdiomas] = useState([]);
  const [busca, setBusca] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  // Remove a barra branca superior do Google
  const removerBarraGoogle = () => {
    document.body.style.top = '0px';
    document.body.style.position = 'static';

    const seletoresBanner = [
      '.goog-te-banner-frame',
      '.goog-te-banner',
      'iframe.goog-te-banner-frame',
      '.VIpgJd-Z441Md-FW25cd-haAclf',
      '#goog-gt-tt'
    ];

    seletoresBanner.forEach((seletor) => {
      document.querySelectorAll(seletor).forEach((el) => el.remove());
    });
  };

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'pt', autoDisplay: false },
          'google_translate_element'
        );
      }
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    const observer = new MutationObserver(() => {
      removerBarraGoogle();

      const selectGoogle = document.querySelector('.goog-te-combo');
      if (selectGoogle && selectGoogle.options.length > 1 && idiomas.length === 0) {
        const listaIdiomas = Array.from(selectGoogle.options)
          .map((opt) => ({
            value: opt.value,
            label: opt.text,
          }))
          .filter((opt) => opt.value !== '');

        setIdiomas(listaIdiomas);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      observer.disconnect();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [idiomas.length]);

  const selecionarIdioma = (value, label) => {
    setLang(value);
    setLangLabel(label);
    setIsOpen(false);
    setBusca('');

    const selectGoogle = document.querySelector('.goog-te-combo');
    if (selectGoogle) {
      selectGoogle.value = value;
      selectGoogle.dispatchEvent(new Event('change'));

      setTimeout(removerBarraGoogle, 100);
      setTimeout(removerBarraGoogle, 500);
      setTimeout(removerBarraGoogle, 1000);
    }
  };

  // Filtra idiomas com base na busca
  const idiomasFiltrados = busca.trim() !== '' 
    ? idiomas.filter((item) => item.label.toLowerCase().includes(busca.toLowerCase()))
    : [];

  return (
    <div className="custom-translate-wrapper" ref={dropdownRef}>
      <div id="google_translate_element" style={{ display: 'none' }} />

      <button 
        type="button"
        className="meu-seletor-btn" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>🌐 {langLabel}</span>
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="translate-dropdown-menu">
          {/* CAMPO DE PESQUISA (ELEMENTO 1) */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Digite um idioma..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              autoFocus
            />
          </div>

          {/* LISTA DE IDIOMAS SEPARADA (ELEMENTO 2) */}
          {busca.trim() !== '' && (
            <div className="results-container">
              <ul className="idiomas-lista">
                {idiomasFiltrados.map((item) => (
                  <li
                    key={item.value}
                    className={lang === item.value ? 'active' : ''}
                    onClick={() => selecionarIdioma(item.value, item.label)}
                  >
                    {item.label}
                  </li>
                ))}

                {idiomasFiltrados.length === 0 && (
                  <li className="no-results">Nenhum idioma encontrado</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const PLAYLIST_INICIAL = [
  { id: 0, nome: "Track 01 - Perdas", arquivo: track1, custom: false },
  { id: 1, nome: "Track 02 - Dan (Sukuna)", arquivo: track2, custom: false },
  { id: 2, nome: "Track 03 - Fênix (Nova)", arquivo: track3, custom: false },
];

const LISTA_CONQUISTAS = [
  { id: "dj",         titulo: "DJ do Ciberespaço",    desc: "Ativou a Trilha Sonora Synthwave.",               icone: "📻" },
  { id: "hacker",     titulo: "Hacker Nato",           desc: "Descobriu o diretório secreto digitando /secret.", icone: "🖥️" },
  { id: "linkedin",   titulo: "Aprovado pelo RH",      desc: "Ativou o Modo Corporativo (/linkedin-mode).",      icone: "👔" },
  { id: "curioso",    titulo: "Curioso de Hardware",   desc: "Abriu o painel de configurações do sistema.",      icone: "⚙️" },
  { id: "cor_custom", titulo: "Estilista Cyber",       desc: "Alterou a cor de destaque do sistema.",            icone: "🎨" },
  { id: "dev",        titulo: "Mestre do Código",      desc: "Executou o comando secreto de desenvolvedor.",     icone: "👨‍💻" },
  { id: "konami",     titulo: "Cheat Ativado",         desc: "Descobriu o Konami Code! ↑↑↓↓←→←→BA",            icone: "🎮" },
  { id: "tempo5min",  titulo: "Tá Curtindo!",          desc: "Ficou mais de 5 minutos no portfólio.",            icone: "⏱️" },
  { id: "snake",      titulo: "Víbora Cibernética",    desc: "Jogou o jogo secreto (/play).",                   icone: "🐍" },
  { id: "monster",    titulo: "Energizado!",           desc: "Tomou um Energético com /monster.",               icone: "⚡" },
  { id: "cafe",       titulo: "Cafeinado(a)",          desc: "Tomou um café com /cafe.",                        icone: "☕" },
  { id: "recruiter",  titulo: "Modo RH",               desc: "Ativou o modo recrutador com /recruiter.",        icone: "📋" },
  { id: "lofi",       titulo: "Lo-Fi Vibes",           desc: "Ativou o modo lo-fi com /lofi.",                  icone: "🎵" },
  { id: "xp1000",     titulo: "Level Up!",             desc: "Acumulou 1000 XP no sistema.",                    icone: "⭐" },
  { id: "fonte_custom", titulo: "Tipógrafo Cyber",     desc: "Instalou uma fonte personalizada do Google Fonts.", icone: "🔤" },
];

const CORES_PRE_PRONTAS = [
  { nome: "Neon Blue",      hex: "#4b80e2" },
  { nome: "Cyberpunk Pink", hex: "#ff007f" },
  { nome: "Matrix Green",   hex: "#00ff41" },
  { nome: "Volt Yellow",    hex: "#e5ff00" },
  { nome: "Sunset Orange",  hex: "#ff5722" }
];

const CORES_FUNDO_PRE_PRONTAS = [
  { nome: "Preto Absoluto",  hex: "#050505" },
  { nome: "Dark Gray",       hex: "#121212" },
  { nome: "Deep Navy",       hex: "#0a0f1d" },
  { nome: "Cyber Purple",    hex: "#0d0714" },
  { nome: "Matrix Night",    hex: "#020d04" },
  { nome: "Dracula Background", hex: "#282a36" }
];

const CORES_TEXTO_PRE_PRONTAS = [
  { nome: "Branco",       hex: "#ffffff" },
  { nome: "Preto",        hex: "#111111" },
  { nome: "Cinza Claro",  hex: "#e5e5e5" },
  { nome: "Cinza Escuro", hex: "#333333" }
];

const traducoes = {
  pt: {
    sistemaConectado: "Sistema Connected",
    corDestaque: "Cor de Destaque",
    corHexLabel: "Código Hexadecimal (Bloqueado 🔒)",
    corHexLiberado: "Código Hexadecimal (Liberado! ⚡)",
    corHexPlaceholder: "#4b80e2",
    corHexInvalida: "Hex inválido. Use o formato #RRGGBB",
    tipografia: "Tipografia",
    tamanhoFonteLabel: "Tamanho da Fonte",
    efeitosSistema: "Efeitos & Sistema",
    lanterna: "Lanterna Mouse",
    animacoes: "Animações",
    particulas: "Partículas Fundo",
    opacidadeVidro: "Opacidade Vidro",
    glitch: "Efeito Glitch",
    cursorCustom: "Cursor Neon",
    trilhaSonora: "Trilha Synthwave",
    idiomaLabel: "Idioma / Language",
    terminalPlaceholder: "Digite /help para ver os comandos...",
    comandoInvalido: "Comando não reconhecido. Digite /help",
    sucessoComando: "Executado com sucesso!",
    conquistasTitulo: "Conquistas do Sistema",
    limparConquistas: "Resetar Sistema 🔄",
    xpLabel: "XP do Sistema",
    tempoLabel: "Tempo na página",
    buscarFonteLabel: "Buscar Fonte no Google Fonts",
    buscarFontePlaceholder: "Ex: Orbitron, Bebas Neue...",
    buscarFonteBotao: "Instalar Fonte",
    buscarFonteCarregando: "Instalando fonte...",
    buscarFonteErro: "Fonte não encontrada no Google Fonts.",
    buscarFonteSucesso: "Fonte instalada com sucesso!",
    apiKeyLabel: "Chave da API do Google Fonts (opcional, ativa busca com sugestões)",
    apiKeyPlaceholder: "Cole sua chave aqui...",
    minhasFontes: "Minhas Fontes Instaladas",
    daltonismoLabel: "Modo Daltonismo",
    daltonismoNenhum: "Desativado",
    daltonismoProtanopia: "Protanopia",
    daltonismoDeuteranopia: "Deuteranopia",
    daltonismoTritanopia: "Tritanopia",
    daltonismoAcromatopsia: "Acromatopsia (P&B)",
    daltonismoCredito: "💡 Ideia sugerida por João Victor Alves",
    corTexto: "Cor do Texto",
    corTextoAutoBadge: "🌙 Dark-mode automático ativado (cor clara detectada)",
    corTextoAutoBotao: "Usar automático",
    corTextoManualBotao: "Manual",
    uploadMusicaTitulo: "🎵 Importar Músicas Próprias",
    uploadMusicaSub: "Suba seus arquivos de áudio (.mp3, .wav, .ogg) para tocar no player do site.",
    uploadMusicaBotao: "+ Adicionar Músicas",
  },
  en: {
    sistemaConectado: "System Connected",
    corDestaque: "Accent Color",
    corHexLabel: "Hex Code (Locked 🔒)",
    corHexLiberado: "Hex Code (Unlocked! ⚡)",
    corHexPlaceholder: "#4b80e2",
    corHexInvalida: "Invalid hex. Use #RRGGBB format",
    tipografia: "Typography",
    tamanhoFonteLabel: "Font Size",
    efeitosSistema: "Effects & System",
    lanterna: "Mouse Flashlight",
    animacoes: "Animations",
    particulas: "Background Particles",
    opacidadeVidro: "Glass Opacity",
    glitch: "Glitch Effect",
    cursorCustom: "Neon Cursor",
    trilhaSonora: "Synthwave Track",
    idiomaLabel: "Language / Idioma",
    terminalPlaceholder: "Type /help to see commands...",
    comandoInvalido: "Command not recognized. Type /help",
    sucessoComando: "Executed successfully!",
    conquistasTitulo: "System Achievements",
    limparConquistas: "Reset System 🔄",
    xpLabel: "System XP",
    tempoLabel: "Time on page",
    buscarFonteLabel: "Search Google Fonts",
    buscarFontePlaceholder: "E.g: Orbitron, Bebas Neue...",
    buscarFonteBotao: "Install Font",
    buscarFonteCarregando: "Installing font...",
    buscarFonteErro: "Font not found on Google Fonts.",
    buscarFonteSucesso: "Font installed successfully!",
    apiKeyLabel: "Google Fonts API Key (optional, enables search suggestions)",
    apiKeyPlaceholder: "Paste your key here...",
    minhasFontes: "My Installed Fonts",
    daltonismoLabel: "Colorblind Mode",
    daltonismoNenhum: "Off",
    daltonismoProtanopia: "Protanopia",
    daltonismoDeuteranopia: "Deuteranopia",
    daltonismoTritanopia: "Tritanopia",
    daltonismoAcromatopsia: "Achromatopsia (B&W)",
    daltonismoCredito: "💡 Idea suggested by João Victor Alves",
    corTexto: "Text Color",
    corTextoAutoBadge: "🌙 Automatic dark-mode enabled (light color detected)",
    corTextoAutoBotao: "Use automatic",
    corTextoManualBotao: "Manual",
    uploadMusicaTitulo: "🎵 Upload Own Tracks",
    uploadMusicaSub: "Upload audio files (.mp3, .wav, .ogg) to play on the site player.",
    uploadMusicaBotao: "+ Add Audio Files",
  }
};

const FONTES_DISPONIVEIS = [
  { nome: "Poppins",    valor: "'Poppins', sans-serif" },
  { nome: "Fira Code",  valor: "'Fira Code', monospace" },
  { nome: "Roboto",     valor: "'Roboto', sans-serif" },
  { nome: "Montserrat", valor: "'Montserrat', sans-serif" },
  { nome: "JetBrains",  valor: "'JetBrains Mono', monospace" },
  { nome: "Ubuntu",     valor: "'Ubuntu', sans-serif" },
  { nome: "Retro 8-Bit",valor: "'Press Start 2P', cursive" }
];

const KONAMI_CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

const XP_ACTIONS = {
  abrir_painel: 10,
  mudar_cor: 15,
  visitar_secao: 20,
  comando_terminal: 25,
  conquista: 50,
};

const STATUS_CAFE = [
  { label: "Cafeína", valor: 65 },
  { label: "Aroma",   valor: 90 },
  { label: "Foco",    valor: 85 },
  { label: "Calor",   valor: 75 },
];

const styles = {
  fontBtn: {
    padding: '8px',
    background: '#0d0d0d',
    color: '#fff',
    border: '1px solid #222',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  controlRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '0.85rem'
  },
  checkbox: {
    accentColor: 'var(--primary)',
    cursor: 'pointer',
    width: '16px',
    height: '16px'
  }
};

function hexParaRgbString(hex) {
  const limpo = hex.replace('#', '');
  const r = parseInt(limpo.substring(0, 2), 16);
  const g = parseInt(limpo.substring(2, 4), 16);
  const b = parseInt(limpo.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function hexValido(hex) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

function normalizarHex(hex) {
  const limpo = hex.replace('#', '');
  if (limpo.length === 3) {
    return '#' + limpo.split('').map(c => c + c).join('');
  }
  return '#' + limpo;
}

function luminanciaRelativa(hex) {
  if (!hexValido(hex)) return 1;
  const limpo = normalizarHex(hex).replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(limpo.substring(i, i + 2), 16) / 255);
  const canal = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}

function misturarHex(hex1, hex2, peso) {
  const c1 = normalizarHex(hex1).replace('#', '').match(/.{2}/g).map(v => parseInt(v, 16));
  const c2 = normalizarHex(hex2).replace('#', '').match(/.{2}/g).map(v => parseInt(v, 16));
  const mix = c1.map((v, i) => Math.round(v * (1 - peso) + c2[i] * peso));
  return '#' + mix.map(v => v.toString(16).padStart(2, '0')).join('');
}

function formatarTempo(segundos) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  if (m === 0) return `${s}s`;
  return `${m}min ${s}s`;
}

function StatusBars({ itens }) {
  const [larguras, setLarguras] = useState(() => itens.map(() => 0));
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setLarguras(itens.map(i => i.valor));
    });
    return () => cancelAnimationFrame(id);
  }, [itens]);
  return (
    <div className="status-bars-container">
      {itens.map((item, i) => (
        <div className="status-bar-row" key={item.label}>
          <div className="status-bar-label">
            <span>{item.label}</span>
            <b>{larguras[i]}%</b>
          </div>
          <div className="status-bar-track">
            <div className="status-bar-fill" style={{ width: `${larguras[i]}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MatrixRainEffect() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒMOYAﾕﾖRAﾘﾙﾚﾛﾜﾝ".split("");
    const fs = 14;
    const cols = canvas.width / fs;
    const drops = Array.from({ length: cols }).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = fs + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs);
        if (drops[i] * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const iv = setInterval(draw, 30);
    return () => clearInterval(iv);
  }, []);
  return <canvas ref={canvasRef} style={{ position:'fixed', top:0, left:0, width:'100vw', height:'100vh', zIndex:99999, pointerEvents:'none' }} />;
}

function ParticulasFundo() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    const cor = () => getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#4b80e2';
    const ps = Array.from({ length: 60 }, () => ({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.8+0.6, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, op: Math.random()*0.5+0.2 }));
    let anim;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      const c = cor();
      ps.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=w; if(p.x>w)p.x=0; if(p.y<0)p.y=h; if(p.y>h)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=c; ctx.globalAlpha=p.op; ctx.fill();
      });
      ctx.globalAlpha=1;
      anim=requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w=window.innerWidth; h=window.innerHeight; canvas.width=w; canvas.height=h; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'fixed', top:0, left:0, width:'100vw', height:'100vh', zIndex:1, pointerEvents:'none' }} />;
}

function FiltrosDaltonismo() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
      <defs>
        <filter id="filtro-protanopia">
          <feColorMatrix type="matrix" values="0.567,0.433,0,0,0  0.558,0.442,0,0,0  0,0.242,0.758,0,0  0,0,0,1,0" />
        </filter>
        <filter id="filtro-deuteranopia">
          <feColorMatrix type="matrix" values="0.625,0.375,0,0,0  0.7,0.3,0,0,0  0,0.3,0.7,0,0  0,0,0,1,0" />
        </filter>
        <filter id="filtro-tritanopia">
          <feColorMatrix type="matrix" values="0.95,0.05,0,0,0  0,0.433,0.567,0,0  0,0.475,0.525,0,0  0,0,0,1,0" />
        </filter>
        <filter id="filtro-acromatopsia">
          <feColorMatrix type="matrix" values="0.299,0.587,0.114,0,0  0.299,0.587,0.114,0,0  0.299,0.587,0.114,0,0  0,0,0,1,0" />
        </filter>
      </defs>
    </svg>
  );
}

function SnakeGame({ onClose }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    const SIZE   = 16;
    const W = Math.floor(canvas.width  / SIZE);
    const H = Math.floor(canvas.height / SIZE);

    const rndFood = (snake) => {
      let f;
      do { f = { x: Math.floor(Math.random()*W), y: Math.floor(Math.random()*H) }; }
      while (snake.some(s => s.x===f.x && s.y===f.y));
      return f;
    };

    const init = () => {
      const snake = [{ x:Math.floor(W/2), y:Math.floor(H/2) }];
      return { snake, dir:{x:1,y:0}, next:{x:1,y:0}, food: rndFood(snake), score:0, dead:false };
    };

    stateRef.current = init();

    const onKey = (e) => {
      const d = stateRef.current.next;
      if (e.key==='ArrowUp'    && d.y!==1)  stateRef.current.next={x:0,y:-1};
      if (e.key==='ArrowDown'  && d.y!==-1) stateRef.current.next={x:0,y:1};
      if (e.key==='ArrowLeft'  && d.x!==1)  stateRef.current.next={x:-1,y:0};
      if (e.key==='ArrowRight' && d.x!==-1) stateRef.current.next={x:1,y:0};
      if (e.key==='Escape') onClose();
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);

    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#4b80e2';

    const tick = () => {
      const s = stateRef.current;
      if (s.dead) {
        ctx.fillStyle='rgba(0,0,0,0.7)'; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='#fff'; ctx.font='bold 20px monospace'; ctx.textAlign='center';
        ctx.fillText(`Game Over! Score: ${s.score}`, canvas.width/2, canvas.height/2-10);
        ctx.font='14px monospace';
        ctx.fillText('Pressione R para reiniciar', canvas.width/2, canvas.height/2+20);
        return;
      }

      s.dir = s.next;
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

      if (head.x<0||head.x>=W||head.y<0||head.y>=H||s.snake.some(seg=>seg.x===head.x&&seg.y===head.y)) {
        s.dead=true; return;
      }

      s.snake.unshift(head);
      if (head.x===s.food.x && head.y===s.food.y) {
        s.score++;
        s.food = rndFood(s.snake);
      } else {
        s.snake.pop();
      }

      ctx.fillStyle='#050505'; ctx.fillRect(0,0,canvas.width,canvas.height);

      ctx.strokeStyle='rgba(255,255,255,0.04)';
      for (let x=0;x<W;x++) { ctx.beginPath(); ctx.moveTo(x*SIZE,0); ctx.lineTo(x*SIZE,canvas.height); ctx.stroke(); }
      for (let y=0;y<H;y++) { ctx.beginPath(); ctx.moveTo(0,y*SIZE); ctx.lineTo(canvas.width,y*SIZE); ctx.stroke(); }

      s.snake.forEach((seg,i) => {
        ctx.fillStyle = i===0 ? '#fff' : primary;
        ctx.shadowColor = primary; ctx.shadowBlur = 8;
        ctx.fillRect(seg.x*SIZE+1, seg.y*SIZE+1, SIZE-2, SIZE-2);
      });
      ctx.shadowBlur=0;

      ctx.fillStyle='#ff007f'; ctx.shadowColor='#ff007f'; ctx.shadowBlur=12;
      ctx.beginPath(); ctx.arc(s.food.x*SIZE+SIZE/2, s.food.y*SIZE+SIZE/2, SIZE/2-2, 0, Math.PI*2); ctx.fill();
      ctx.shadowBlur=0;

      ctx.fillStyle='#fff'; ctx.font='14px monospace'; ctx.textAlign='left';
      ctx.fillText(`Score: ${s.score}`, 8, 20);
    };

    const onR = (e) => { if(e.key==='r'||e.key==='R') stateRef.current = init(); };
    window.addEventListener('keydown', onR);

    const iv = setInterval(tick, 120);
    return () => { clearInterval(iv); window.removeEventListener('keydown', onKey); window.removeEventListener('keydown', onR); };
  }, [onClose]);

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:99999, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px' }}>
      <div style={{ color:'var(--primary)', fontFamily:"'Fira Code',monospace", fontSize:'1.1rem', letterSpacing:2 }}>
        🐍 SNAKE — setas para mover · ESC para fechar · R para reiniciar
      </div>
      <canvas ref={canvasRef} width={480} height={320} style={{ border:'1px solid var(--primary)', borderRadius:8, boxShadow:'0 0 24px var(--primary)' }} />
    </div>
  );
}

function EnergeticoEasterEgg({ onClose, imagemLata }) {
  const STATUS_ENERGETICO_LOCAL = [
    { label: 'Foco', valor: 100 },
    { label: 'Energia', valor: 100 },
    { label: 'Insônia', valor: 85 },
  ];

  useEffect(() => {
    const esc = (e) => { if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', esc);
    const tempo = setTimeout(onClose, 7000);
    return () => {
      window.removeEventListener('keydown', esc);
      clearTimeout(tempo);
    };
  }, [onClose]);

  return (
    <div className="energetico-easter-egg" onClick={onClose}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');
          
          .monster-lata-premium-wrap {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            width: 100%;
          }

          .monster-lata-image {
            width: auto;
            height: 320px;
            display: block;
            filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.65));
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
          }

          .monster-lata-image:hover {
            transform: scale(1.06) rotate(1.5deg);
          }
        `}
      </style>

      <div className="energetico-inner" onClick={(e) => e.stopPropagation()}>
        <div className="monster-lata-premium-wrap">
          {imagemLata ? (
            <img 
              src={imagemLata} 
              alt="Monster Energy Ultra White" 
              className="monster-lata-image"
            />
          ) : (
            <div style={{ color: '#ff4a4a', fontSize: '0.9rem', textAlign: 'center', height: '320px', display: 'flex', alignItems: 'center' }}>
              [Imagem da lata não encontrada. Verifique o caminho no App.jsx]
            </div>
          )}
        </div>

        <div className="energetico-conteudo-inferior" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box' }}>
          <div className="energetico-text">
            <span style={{ fontFamily: "'Oswald', 'Arial Black', sans-serif", fontWeight: 700 }}>
              ENERGIA MÁXIMA!
            </span>
            <small style={{ display: 'block' }}>⚡ +100% DE FOCO TURBINADO ⚡</small>
          </div>
          
          <StatusBars itens={STATUS_ENERGETICO_LOCAL} />
          
          <small style={{ color: '#888', fontSize: '0.7rem', display: 'block', textAlign: 'center', marginTop: '5px' }}>
            Clique fora ou ESC para fechar
          </small>
        </div>

      </div>
      <div className="monster-scanlines" />
    </div>
  );
}

function CafeEasterEgg({ onClose }) {
  useEffect(() => {
    const esc = (e) => { if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', esc);
    const id = setTimeout(onClose, 7000);
    return () => {
      window.removeEventListener('keydown', esc);
      clearTimeout(id);
    };
  }, [onClose]);
  return (
    <div className="cafe-easter-egg" onClick={onClose}>
      <div className="cafe-inner" onClick={(e) => e.stopPropagation()}>
        <div className="cafe-xicara-wrap">
          <span className="cafe-vapor" />
          <span className="cafe-vapor" />
          <span className="cafe-vapor" />
          <span className="cafe-xicara">☕</span>
        </div>
        <div className="cafe-text">
          <span>HORA DO CAFÉ!</span>
          <small>☕ MODO FOCO ATIVADO ☕</small>
        </div>
        <StatusBars itens={STATUS_CAFE} />
        <small style={{ color:'#888', fontSize:'0.7rem' }}>Clique fora ou ESC para fechar</small>
      </div>
      <div className="monster-scanlines" />
    </div>
  );
}

function BarraProgresso() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? Math.round((window.scrollY / total) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'3px', zIndex:99999, background:'rgba(255,255,255,0.05)', pointerEvents:'none' }}>
      <div style={{ height:'100%', width:`${pct}%`, background:'var(--primary)', boxShadow:'0 0 8px var(--primary)', transition:'width 0.1s linear' }} />
    </div>
  );
}

function BotaoTopo() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const onScroll = () => setVis(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className="btn-voltar-topo"
      style={{ opacity: vis ? 1 : 0, pointerEvents: vis ? 'auto' : 'none' }}
      onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
      title="Voltar ao topo"
    >↑</button>
  );
}

function ToastBoasVindas() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const j = localStorage.getItem('portfolio_visited');
    if (!j) {
      localStorage.setItem('portfolio_visited', '1');
      const t1 = setTimeout(() => setVis(true), 1800);
      const t2 = setTimeout(() => setVis(false), 7000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);
  if (!vis) return null;
  return (
    <div className="toast-boasvindas">
      <span>👋 Olá! Digite <strong>/help</strong> no terminal para ver os segredos.</span>
      <button onClick={() => setVis(false)}>×</button>
    </div>
  );
}

function GitHubFeed({ usuario = 'jose-c-web' }) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${usuario}/events/public?per_page=6`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setEventos(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [usuario]);

  const tipoIcone = (type) => {
    const map = { PushEvent:'📦', CreateEvent:'🌿', PullRequestEvent:'🔀', IssuesEvent:'🐛', WatchEvent:'⭐', ForkEvent:'🍴' };
    return map[type] || '⚡';
  };

  const tipoLabel = (e) => {
    if (e.type === 'PushEvent') return `Push em ${e.repo.name.split('/')[1]}`;
    if (e.type === 'CreateEvent') return `Criou ${e.payload.ref_type} em ${e.repo.name.split('/')[1]}`;
    if (e.type === 'WatchEvent') return `⭐ ${e.repo.name.split('/')[1]}`;
    return `${e.type.replace('Event','')} em ${e.repo.name.split('/')[1]}`;
  };

  const dataRelativa = (iso) => {
    const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (diff < 60) return `${diff}s atrás`;
    if (diff < 3600) return `${Math.floor(diff/60)}min atrás`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h atrás`;
    return `${Math.floor(diff/86400)}d atrás`;
  };

  return (
    <div className="github-feed">
      <h4 style={{ marginBottom:'10px', color:'var(--primary)', fontSize:'0.85rem', letterSpacing:1 }}>
        ⚡ GitHub Activity
      </h4>
      {loading ? (
        <div style={{ color:'#666', fontSize:'0.8rem', fontFamily:"'Fira Code',monospace" }}>Carregando...</div>
      ) : eventos.length === 0 ? (
        <div style={{ color:'#666', fontSize:'0.8rem' }}>Nenhum evento recente.</div>
      ) : (
        eventos.map((e, i) => (
          <div key={i} className="github-feed-item">
            <span className="gh-icon">{tipoIcone(e.type)}</span>
            <div className="gh-info">
              <span className="gh-label">{tipoLabel(e)}</span>
              <span className="gh-time">{dataRelativa(e.created_at)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export default function App() {
  // ── boot ──
  const [carregando, setCarregando]   = useState(true);
  const [linhasBoot, setLinhasBoot]   = useState([]);

  // ── conquistas ──
  const [conquistaAtiva, setConquistaAtiva]         = useState(null);
  const [conquistasDesbloqueadas, setConquistasDesbloqueadas] = useState(() => {
    try { const s = localStorage.getItem('portfolio_conquistas'); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });

  // ── XP & Tempo ──
  const [xp, setXp] = useState(() => {
    try { return parseInt(localStorage.getItem('portfolio_xp') || '0'); } catch { return 0; }
  });
  const [tempoSegundos, setTempoSegundos] = useState(0);

  // ── painel & preferências de fundo ──
  const [corFundo, setCorFundo] = useState(() => {
    return localStorage.getItem('portfolio_cor_fundo') || '#050505';
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-dark', corFundo);
    try {
      localStorage.setItem('portfolio_cor_fundo', corFundo);
    } catch (e) {
      console.warn("Erro ao salvar a cor de fundo:", e);
    }
  }, [corFundo]);

  const mudarCorFundo = (hex) => {
    setCorFundo(hex);
  };

  const [menuAberto, setMenuAberto]       = useState(false);
  const [lanternaAtiva, setLanternaAtiva] = useState(true);
  const [animacoesAtivas, setAnimacoesAtivas] = useState(true);
  const [nivelBlur, setNivelBlur]         = useState(8);
  const [fonteSelecionada, setFonteSelecionada] = useState("'Poppins', sans-serif");
  const [tamanhoFonte, setTamanhoFonte]   = useState(16);

  // ── Google Fonts ──
  const [fontesCustom, setFontesCustom] = useState(() => {
    try { return JSON.parse(localStorage.getItem('portfolio_fontes_custom') || '[]'); } catch { return []; }
  });
  const [buscaFonteInput, setBuscaFonteInput]     = useState('');
  const [carregandoFonte, setCarregandoFonte]     = useState(false);
  const [erroFonte, setErroFonte]                 = useState('');
  const [sucessoFonte, setSucessoFonte]           = useState(false);
  const [googleApiKey, setGoogleApiKey]           = useState(() => {
    try { return localStorage.getItem('portfolio_google_fonts_key') || ''; } catch { return ''; }
  });
  const [listaFontesGoogle, setListaFontesGoogle] = useState([]);
  const [sugestoesFontes, setSugestoesFontes]     = useState([]);
  const [particulasAtivas, setParticulasAtivas]   = useState(true);
  const [cursorTrailAtivo, setCursorTrailAtivo]   = useState(false);
  const [contadorVisitas, setContadorVisitas]     = useState(1337);

  // ── UI ──
  const [idioma, setIdioma]               = useState('pt');
  const [glitchAtivo, setGlitchAtivo]     = useState(false);
  const [cursorAtivo, setCursorAtivo]     = useState(false);

  // ── customização do cursor ──
  const [cursorEstilo, setCursorEstilo]   = useState(() => {
    try { return localStorage.getItem('portfolio_cursor_estilo') || 'dot'; } catch { return 'dot'; }
  });
  const [cursorCorInput, setCursorCorInput] = useState(() => {
    try { return localStorage.getItem('portfolio_cursor_cor') || '#4b80e2'; } catch { return '#4b80e2'; }
  });
  const [cursorCorErro, setCursorCorErro] = useState(false);
  const [cursorTamanho, setCursorTamanho] = useState(() => {
    try { return parseInt(localStorage.getItem('portfolio_cursor_tamanho') || '28'); } catch { return 28; }
  });

  // ── imagens importadas para o cursor ──
  const [cursorImagens, setCursorImagens] = useState(() => {
    try { return JSON.parse(localStorage.getItem('portfolio_cursor_imagens') || '[]'); } catch { return []; }
  });
  const [cursorImagemId, setCursorImagemId] = useState(() => {
    try { return localStorage.getItem('portfolio_cursor_imagem_id') || ''; } catch { return ''; }
  });
  const [cursorImagemErro, setCursorImagemErro] = useState('');
  const inputImagemCursorRef = useRef(null);

  const cursorImagemAtual = cursorImagens.find(img => img.id === cursorImagemId)?.dados || '';

  const importarImagensCursor = (e) => {
    const arquivos = Array.from(e.target.files || []);
    if (!arquivos.length) return;
    setCursorImagemErro('');
    arquivos.forEach((arquivo) => {
      if (!arquivo.type.startsWith('image/')) { setCursorImagemErro('Apenas arquivos de imagem são aceitos.'); return; }
      if (arquivo.size > 500 * 1024) { setCursorImagemErro('Imagem muito grande (máx. 500KB).'); return; }
      const leitor = new FileReader();
      leitor.onload = () => {
        const nova = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, nome: arquivo.name, dados: String(leitor.result) };
        setCursorImagens(prev => [...prev, nova]);
        setCursorImagemId(nova.id);
        setCursorEstilo('custom-image');
      };
      leitor.onerror = () => setCursorImagemErro('Não foi possível ler a imagem.');
      leitor.readAsDataURL(arquivo);
    });
    e.target.value = '';
  };

  const removerImagemCursor = (id) => {
    setCursorImagens(prev => prev.filter(img => img.id !== id));
    setCursorImagemId(prev => (prev === id ? '' : prev));
  };

  // ── customização do rastro ──
  const [trailEstilo, setTrailEstilo]     = useState(() => {
    try { return localStorage.getItem('portfolio_trail_estilo') || 'dots'; } catch { return 'dots'; }
  });
  const [trailCorAuto, setTrailCorAuto]   = useState(() => {
    try { return localStorage.getItem('portfolio_trail_cor_auto') !== 'false'; } catch { return true; }
  });
  const [trailCorInput, setTrailCorInput] = useState(() => {
    try { return localStorage.getItem('portfolio_trail_cor') || '#4b80e2'; } catch { return '#4b80e2'; }
  });
  const [trailCorErro, setTrailCorErro]   = useState(false);
  const [trailEmoji, setTrailEmoji] = useState(() => {
    try { return localStorage.getItem('portfolio_trail_emoji') || '⭐'; } catch { return '⭐'; }
  });
  const [trailAutoPerf, setTrailAutoPerf] = useState(() => {
    try { return localStorage.getItem('portfolio_trail_autoperf') !== 'false'; } catch { return true; }
  });
  const [, setTrailPerfInfo] = useState({ fps: 60, qualidade: 1 });
  const aoMudarPerformance = useCallback((info) => setTrailPerfInfo(info), []);
  const [trailIntensidade, setTrailIntensidade] = useState(() => {
    try { return parseInt(localStorage.getItem('portfolio_trail_intensidade') || '5'); } catch { return 5; }
  });
  
  // ── Músicas & Upload Customizado ──
  const [playlist, setPlaylist]           = useState(PLAYLIST_INICIAL);
  const [musicaAtiva, setMusicaAtiva]     = useState(false);
  const [musicaAtualIndex, setMusicaAtualIndex] = useState(0);
  const inputAudioRef = useRef(null);

  const subirAudioCustom = (e) => {
    const arquivos = Array.from(e.target.files || []);
    if (!arquivos.length) return;

    const novasFaixas = [];
    arquivos.forEach((arquivo) => {
      if (arquivo.type.startsWith('audio/')) {
        const urlAudio = URL.createObjectURL(arquivo);
        novasFaixas.push({
          id: Date.now() + Math.random().toString(36).slice(2, 9),
          nome: arquivo.name.replace(/\.[^/.]+$/, ""),
          arquivo: urlAudio,
          custom: true
        });
      }
    });

    if (novasFaixas.length > 0) {
      setPlaylist(prev => [...prev, ...novasFaixas]);
      setMusicaAtualIndex(playlist.length);
      setMusicaAtiva(true);
    }
    e.target.value = '';
  };

  const removerMusicaCustom = (id) => {
    setPlaylist(prev => {
      const nova = prev.filter(m => m.id !== id);
      if (musicaAtualIndex >= nova.length) {
        setMusicaAtualIndex(Math.max(0, nova.length - 1));
      }
      return nova;
    });
  };

  const [comandoInput, setComandoInput]   = useState('');
  const [retornoTerminal, setRetornoTerminal]   = useState('');
  const [linkedinMode, setLinkedinMode]   = useState(false);
  const [lofiMode, setLofiMode]           = useState(false);

  // ── efeitos especiais ──
  const [chuvaMatrix, setChuvaMatrix]     = useState(false);
  const [hackSim, setHackSim]             = useState(false);
  const [linhasHack, setLinhasHack]       = useState([]);
  const [, setContadorGlitch]             = useState(0);
  const [telaAzul, setTelaAzul]           = useState(false);

  // ── easter eggs ──
  const [snakeAberto, setSnakeAberto]     = useState(false);
  const [energeticoAtivo, setEnergeticoAtivo] = useState(false);
  const [cafeAtivo, setCafeAtivo]         = useState(false);
  const [, setKonamiSeq]                  = useState([]);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [modoDaltonismo, setModoDaltonismo] = useState(() => {
    try { return localStorage.getItem('portfolio_daltonismo') || 'nenhum'; } catch { return 'nenhum'; }
  });

  // ── cor de destaque e fundo ──
  const [corHexInput, setCorHexInput]           = useState('#4b80e2');
  const [corHexErro, setCorHexErro]             = useState(false);
  const [corFundoHexInput, setCorFundoHexInput] = useState(corFundo);
  const [corFundoErro, setCorFundoErro]         = useState(false);

  // ── cor do texto ──
  const [textoAuto, setTextoAuto]         = useState(() => {
    try { return localStorage.getItem('portfolio_texto_auto') !== 'false'; } catch { return true; }
  });
  const [corTextoInput, setCorTextoInput] = useState(() => {
    try { return localStorage.getItem('portfolio_cor_texto') || '#ffffff'; } catch { return '#ffffff'; }
  });
  const [corTextoErro, setCorTextoErro]   = useState(false);
  const [modoTextoEscuro, setModoTextoEscuro] = useState(false);

  // ── arrastar botão ──
  const [btnPos, setBtnPos]               = useState({ x: window.innerWidth - 60, y: window.innerHeight / 2 - 25 });
  const isDragging   = useRef(false);
  const dragStart    = useRef({ x:0, y:0 });
  const dragStartPos = useRef({ x:0, y:0 });
  const hasMoved     = useRef(false);
  const audioRef     = useRef(null);

  const t = traducoes[idioma] || traducoes.pt;
  const mestreDoSistema = conquistasDesbloqueadas.length === LISTA_CONQUISTAS.length;
  const xpLevel = Math.floor(xp / 100) + 1;

  // ── helpers ──────────────────────────────────────────────────
  const ganharXP = useCallback((acao) => {
    const ganho = XP_ACTIONS[acao] || 10;
    setXp(prev => {
      const novo = prev + ganho;
      try { localStorage.setItem('portfolio_xp', String(novo)); } catch {}
      return novo;
    });
  }, []);

  const desbloquearConquista = useCallback((id, titulo, icone = "🏆") => {
    setConquistasDesbloqueadas(prev => {
      if (prev.includes(id)) return prev;
      const nova = [...prev, id];
      try { localStorage.setItem('portfolio_conquistas', JSON.stringify(nova)); } catch {}
      setConquistaAtiva({ titulo, icone });
      setTimeout(() => setConquistaAtiva(null), 4000);
      ganharXP('conquista');
      return nova;
    });
  }, [ganharXP]);

  const limparConquistas = () => {
    localStorage.removeItem('portfolio_conquistas');
    localStorage.removeItem('portfolio_xp');
    setConquistasDesbloqueadas([]);
    setXp(0);
    setRetornoTerminal("Sistema reiniciado. Conquistas e XP limpos!");
  };

  const mudarCorPrincipal = useCallback((hex) => {
    document.documentElement.style.setProperty('--primary', hex);
    document.documentElement.style.setProperty('--primary-rgb', hexParaRgbString(hex));
    desbloquearConquista("cor_custom","Estilista Cyber: Mudou as cores!","🎨");
    ganharXP('mudar_cor');
  }, [desbloquearConquista, ganharXP]);

  const aplicarCorTexto = useCallback((hexPrincipal) => {
    document.documentElement.style.setProperty('--white', hexPrincipal);
    const ehClaro = luminanciaRelativa(hexPrincipal) > 0.5;
    const secundaria = ehClaro
      ? misturarHex(hexPrincipal, '#000000', 0.45)
      : misturarHex(hexPrincipal, '#ffffff', 0.35);
    document.documentElement.style.setProperty('--text-gray', secundaria);
    try { localStorage.setItem('portfolio_cor_texto', hexPrincipal); } catch {}
  }, []);

  useEffect(() => {
    if (!textoAuto) return;
    const fundoEhClaro = luminanciaRelativa(corFundo) > 0.55;
    const corAutomatica = fundoEhClaro ? '#111111' : '#ffffff';
    aplicarCorTexto(corAutomatica);
    setCorTextoInput(corAutomatica);
    setModoTextoEscuro(fundoEhClaro);
  }, [corFundo, textoAuto, aplicarCorTexto]);

  useEffect(() => {
    try { localStorage.setItem('portfolio_texto_auto', String(textoAuto)); } catch {}
  }, [textoAuto]);

  useEffect(() => {
    if (!textoAuto && hexValido(corTextoInput)) {
      aplicarCorTexto(corTextoInput);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const aoSelecionarCorTextoPicker = (hex) => {
    setTextoAuto(false);
    setCorTextoInput(hex);
    setCorTextoErro(false);
    aplicarCorTexto(hex);
  };
  const aoDigitarCorTextoHex = (v) => {
    setTextoAuto(false);
    setCorTextoInput(v);
    if (hexValido(v)) { setCorTextoErro(false); aplicarCorTexto(v); }
    else { setCorTextoErro(true); }
  };
  const ativarCorTextoAutomatica = () => setTextoAuto(true);

  const paraTituloFonte = (nome) =>
    nome.trim().split(/\s+/).filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');

  const tentarCarregarFonte = useCallback(async (nomeFonte) => {
    const familia = nomeFonte.replace(/\s+/g, '+');
    const cssUrl = `https://fonts.googleapis.com/css2?family=${familia}:wght@400;600;700&display=swap`;
    const linkId = `google-font-${familia.toLowerCase()}`;

    let link = document.getElementById(linkId);
    const linkJaExistia = !!link;
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = cssUrl;
      document.head.appendChild(link);
    }

    if (!linkJaExistia) {
      await new Promise((resolve) => {
        link.onload = resolve;
        link.onerror = resolve;
        setTimeout(resolve, 2500);
      });
    }

    let encontrada = true;
    if (document.fonts && document.fonts.load) {
      const carregadas = await document.fonts.load(`16px "${nomeFonte}"`);
      await document.fonts.ready;
      encontrada = carregadas && carregadas.length > 0;
    }

    if (!encontrada && !linkJaExistia) link.remove();
    return encontrada;
  }, []);

  const instalarFonteGoogle = useCallback(async (nomeFonteRaw) => {
    const entrada = (nomeFonteRaw || '').trim();
    if (!entrada) return;

    setCarregandoFonte(true);
    setErroFonte('');
    setSucessoFonte(false);

    try {
      const candidatos = [entrada, paraTituloFonte(entrada)]
        .filter((v, i, arr) => v && arr.indexOf(v) === i);

      let nomeEncontrado = null;
      for (const candidato of candidatos) {
        const ok = await tentarCarregarFonte(candidato);
        if (ok) { nomeEncontrado = candidato; break; }
      }

      if (!nomeEncontrado) throw new Error('font-not-found');

      const nomeFonte = nomeEncontrado;
      const valorFonte = `'${nomeFonte}', sans-serif`;

      setFontesCustom(prev => {
        if (prev.some(f => f.valor === valorFonte)) return prev;
        const nova = [...prev, { nome: nomeFonte, valor: valorFonte }];
        try { localStorage.setItem('portfolio_fontes_custom', JSON.stringify(nova)); } catch {}
        return nova;
      });

      setFonteSelecionada(valorFonte);
      setSucessoFonte(true);
      setBuscaFonteInput('');
      setSugestoesFontes([]);
      desbloquearConquista("fonte_custom", "Tipógrafo Cyber: Instalou uma fonte do Google Fonts!", "🔤");
      ganharXP('mudar_cor');
      setTimeout(() => setSucessoFonte(false), 3000);
    } catch {
      setErroFonte(idioma === 'pt' ? 'Fonte não encontrada no Google Fonts.' : 'Font not found on Google Fonts.');
    } finally {
      setCarregandoFonte(false);
    }
  }, [desbloquearConquista, ganharXP, idioma, tentarCarregarFonte]);

  const removerFonteCustom = useCallback((valorFonte) => {
    setFontesCustom(prev => {
      const nova = prev.filter(f => f.valor !== valorFonte);
      try { localStorage.setItem('portfolio_fontes_custom', JSON.stringify(nova)); } catch {}
      return nova;
    });
    if (fonteSelecionada === valorFonte) setFonteSelecionada("'Poppins', sans-serif");
  }, [fonteSelecionada]);

  useEffect(() => {
    if (!googleApiKey) { setListaFontesGoogle([]); return; }
    let cancelado = false;
    (async () => {
      try {
        const resp = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${googleApiKey}&sort=popularity`);
        if (!resp.ok) throw new Error('api-key-invalida');
        const data = await resp.json();
        if (!cancelado) setListaFontesGoogle((data.items || []).map(f => f.family));
      } catch {
        if (!cancelado) setListaFontesGoogle([]);
      }
    })();
    return () => { cancelado = true; };
  }, [googleApiKey]);

  useEffect(() => {
    const termo = buscaFonteInput.trim().toLowerCase();
    if (!termo || listaFontesGoogle.length === 0) { setSugestoesFontes([]); return; }
    setSugestoesFontes(
      listaFontesGoogle.filter(f => f.toLowerCase().includes(termo)).slice(0, 6)
    );
  }, [buscaFonteInput, listaFontesGoogle]);

  const salvarApiKeyGoogleFonts = useCallback((valor) => {
    setGoogleApiKey(valor);
    try {
      if (valor) localStorage.setItem('portfolio_google_fonts_key', valor);
      else localStorage.removeItem('portfolio_google_fonts_key');
    } catch {}
  }, []);

  const fecharSnake      = useCallback(() => setSnakeAberto(false), []);
  const fecharEnergetico = useCallback(() => setEnergeticoAtivo(false), []);
  const fecharCafe       = useCallback(() => setCafeAtivo(false), []);

  // ── boot ──
  useEffect(() => {
    const h = new Date().getHours();
    const logs = [
      "> CONNECTING TO JOSE-C-WEB CORE...",
      "> LOADING PROJECTS [OK]",
      "> LOADING CERTIFICATES [OK]",
      (h>=0&&h<5) ? "> WARNING: WORKING LATE NIGHT DETECTED... GO TO SLEEP 🌙" : null,
      "> INITIALIZING INTERACTIVE UI... [SUCCESS]",
      "> XP SYSTEM ONLINE [OK]",
      "> TYPE /help FOR COMMANDS",
    ].filter(Boolean);
    logs.forEach((l,i) => setTimeout(() => setLinhasBoot(p=>[...p,l]), (i+1)*350));
    setTimeout(() => setCarregando(false), (logs.length+1)*350);
    document.documentElement.style.setProperty('--primary-rgb', hexParaRgbString('#4b80e2'));
  }, []);

  // ── tempo ──
  useEffect(() => {
    const iv = setInterval(() => {
      setTempoSegundos(s => {
        const novo = s + 1;
        if (novo === 300) {
          desbloquearConquista("tempo5min","Tá Curtindo! 5min no portfólio","⏱️");
        }
        return novo;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [desbloquearConquista]);

  // ── XP 1000 ──
  useEffect(() => {
    if (xp >= 1000) desbloquearConquista("xp1000","Level Up! 1000 XP acumulados","⭐");
  }, [xp, desbloquearConquista]);

  // ── Konami Code ──
  useEffect(() => {
    const onKey = (e) => {
      setKonamiSeq(prev => {
        const next = [...prev, e.key].slice(-KONAMI_CODE.length);
        if (next.join(',') === KONAMI_CODE.join(',')) {
          mudarCorPrincipal('#e5ff00');
          setCorHexInput('#e5ff00');
          setChuvaMatrix(true);
          setTimeout(() => setChuvaMatrix(false), 4000);
          setRetornoTerminal("🎮 KONAMI CODE ATIVADO! +100 XP!");
          desbloquearConquista("konami","Cheat Ativado! Konami Code!","🎮");
          setXp(p => { const n=p+100; try{localStorage.setItem('portfolio_xp',String(n));}catch{} return n; });
          return [];
        }
        return next;
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mudarCorPrincipal, desbloquearConquista]);

  // ── Visitar seções ──
  useEffect(() => {
    const secs = document.querySelectorAll('section[id]');
    const visited = new Set();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting && !visited.has(en.target.id)) {
          visited.add(en.target.id);
          ganharXP('visitar_secao');
        }
      });
    }, { threshold: 0.3 });
    secs.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [ganharXP]);

  // ── Tema no localStorage ──
  useEffect(() => {
    try {
      const tema = localStorage.getItem('portfolio_tema');
      if (tema) {
        const { cor, fonte, tamanho } = JSON.parse(tema);
        if (cor)    { setCorHexInput(cor); mudarCorPrincipal(cor); }
        if (fonte)  setFonteSelecionada(fonte);
        if (tamanho) setTamanhoFonte(tamanho);
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_tema', JSON.stringify({ cor: corHexInput, fonte: fonteSelecionada, tamanho: tamanhoFonte }));
    } catch {}
  }, [corHexInput, fonteSelecionada, tamanhoFonte]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cor    = params.get('cor');
    const fonte  = params.get('fonte');
    const tam    = params.get('tam');
    if (cor && hexValido('#'+cor)) { const h='#'+cor; setCorHexInput(h); mudarCorPrincipal(h); }
    if (fonte) setFonteSelecionada(decodeURIComponent(fonte));
    if (tam)   setTamanhoFonte(Number(tam));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copiarLinkTema = () => {
    const cor   = corHexInput.replace('#','');
    const fonte = encodeURIComponent(fonteSelecionada);
    const url   = `${window.location.origin}${window.location.pathname}?cor=${cor}&fonte=${fonte}&tam=${tamanhoFonte}`;
    navigator.clipboard.writeText(url).then(() => setRetornoTerminal("🔗 Link do tema copiado!")).catch(() => setRetornoTerminal("Erro ao copiar link."));
  };

  // ── Lo-fi mode ──
  useEffect(() => {
    if (lofiMode) {
      document.documentElement.style.setProperty('--primary', '#b8a9c9');
      document.documentElement.style.setProperty('--bg-dark', '#1a1a2e');
      document.body.style.filter = 'saturate(0.6) brightness(0.9)';
      setGlitchAtivo(false);
      setParticulasAtivas(false);
    } else {
      document.body.style.filter = '';
      if (hexValido(corHexInput)) mudarCorPrincipal(corHexInput);
      document.documentElement.style.setProperty('--bg-dark', corFundo);
      setParticulasAtivas(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lofiMode]);

  // ── Recruiter mode ──
  useEffect(() => {
    if (recruiterMode) {
      setGlitchAtivo(false);
      setParticulasAtivas(false);
      setCursorAtivo(false);
      mudarCorPrincipal('#0a66c2');
      setCorHexInput('#0a66c2');
      document.body.classList.add('recruiter-mode');
    } else {
      document.body.classList.remove('recruiter-mode');
      setParticulasAtivas(true);
    }
  }, [recruiterMode, mudarCorPrincipal]);

  useEffect(() => {
    if (!glitchAtivo) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastY);
      if (delta > 80) {
        document.body.classList.add('section-glitch-flash');
        setTimeout(() => document.body.classList.remove('section-glitch-flash'), 300);
      }
      lastY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [glitchAtivo]);

  // ── Terminal ──
  const executarComando = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = comandoInput.trim().toLowerCase();
    setComandoInput('');
    ganharXP('comando_terminal');

    if (cmd === '/secret') {
      mudarCorPrincipal('#00ff41'); setCorHexInput('#00ff41');
      setRetornoTerminal("Matrix Mode Active.");
      desbloquearConquista("hacker","Hacker Nato: Usou o terminal!","🖥️");

    } else if (cmd === '/matrix') {
      setChuvaMatrix(true);
      setRetornoTerminal("Iniciando Matrix Rain por 5 segundos...");
      setTimeout(() => setChuvaMatrix(false), 5000);

    } else if (cmd === '/play') {
      setSnakeAberto(true);
      setRetornoTerminal("🐍 Snake iniciado! Use as setas. ESC para fechar.");
      desbloquearConquista("snake","Víbora Cibernética: Jogou o Snake!","🐍");

    } else if (cmd === '/monster') {
      setEnergeticoAtivo(true);
      setRetornoTerminal("⚡ ENERGIA MÁXIMA ATIVADA...");
      desbloquearConquista("monster","Energizado! Tomou um Energético!","⚡");

    } else if (cmd === '/cafe') {
      setCafeAtivo(true);
      setRetornoTerminal("☕ PREPARANDO UM CAFÉ...");
      desbloquearConquista("cafe","Cafeinado(a)! Tomou um café!","☕");

    } else if (cmd === '/recruiter') {
      setRecruiterMode(r => !r);
      setRetornoTerminal(recruiterMode ? "Modo RH desativado." : "📋 Modo Recrutador ativado! Bem-vindo, RH.");
      if (!recruiterMode) desbloquearConquista("recruiter","Modo RH ativado!","📋");

    } else if (cmd === '/lofi') {
      setLofiMode(l => !l);
      setRetornoTerminal(lofiMode ? "Lo-fi desativado." : "🎵 Lo-Fi Vibes ativado. Relaxa...");
      if (!lofiMode) desbloquearConquista("lofi","Lo-Fi Vibes!","🎵");

    } else if (cmd === '/share') {
      copiarLinkTema();

    } else if (cmd === '/sudo-hack') {
      setHackSim(true); setLinhasHack([]);
      setRetornoTerminal("Bypassing firewalls...");
      const logs = ["ESTABLISHING PROXY... [OK]","OVERRIDING SECURITY... [OK]","ACCESSING ROOT...","DECRYPTING CV_JOSE_C.pdf...","DOWNLOADING..."];
      logs.forEach((l,i) => setTimeout(() => {
        setLinhasHack(p=>[...p,`> ${l}`]);
        if(i===logs.length-1) setTimeout(()=>{ setHackSim(false); window.open("https://github.com/jose-c-web","_blank"); },800);
      }, (i+1)*400));

    } else if (cmd === '/rickroll') {
      setRetornoTerminal("Never gonna give you up! 🎶");
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ","_blank");

    } else if (cmd === '/colors') {
      setRetornoTerminal("Temas: /dracula /matrix-theme /cyberpunk-theme");

    } else if (cmd === '/matrix-theme') {
      mudarCorPrincipal('#00ff41'); setCorHexInput('#00ff41'); setRetornoTerminal("Tema Matrix ativado.");
    } else if (cmd === '/cyberpunk-theme') {
      mudarCorPrincipal('#ff007f'); setCorHexInput('#ff007f'); setRetornoTerminal("Tema Cyberpunk ativado.");
    } else if (cmd === '/dracula') {
      mudarCorPrincipal('#ff79c6'); setCorHexInput('#ff79c6'); setRetornoTerminal("Dracula Mode Active.");

    } else if (cmd === '/dev') {
      setRetornoTerminal("Modo Dev Ativado. Você é fera!");
      desbloquearConquista("dev","Mestre do Código!","👨‍💻");

    } else if (cmd === '/linkedin-mode') {
      setLinkedinMode(l => !l);
      if (!linkedinMode) {
        mudarCorPrincipal('#0a66c2'); setCorHexInput('#0a66c2');
        setRetornoTerminal("Modo Corporativo ativado.");
        desbloquearConquista("linkedin","Aprovado pelo RH!","👔");
      } else {
        mudarCorPrincipal('#4b80e2'); setCorHexInput('#4b80e2');
        setRetornoTerminal("Modo Cyberpunk restaurado.");
      }

    } else if (cmd === '/clear') {
      setRetornoTerminal('');

    } else if (cmd === '/xp') {
      setRetornoTerminal(`⭐ XP: ${xp} | Level: ${xpLevel}`);

    } else if (cmd === '/tempo') {
      setRetornoTerminal(`⏱️ Você está aqui há ${formatarTempo(tempoSegundos)}`);

    } else if (cmd === '/github') {
      setRetornoTerminal("Abrindo GitHub...");
      window.open("https://github.com/jose-c-web","_blank");

    } else if (cmd === '/linkedin') {
      setRetornoTerminal("Abrindo LinkedIn...");
      window.open("https://linkedin.com/","_blank");

    } else if (['/projects','/certificados','/contact','/sobre','/about'].includes(cmd)) {
      const id = cmd.replace('/','');
      document.getElementById(id==='sobre'||id==='about'?'about':id)?.scrollIntoView({behavior:'smooth'});
      setRetornoTerminal(`Roteando para #${id}...`);

    } else if (cmd === '/help' || cmd === '/comandos' || cmd === '/ajuda' || cmd === '/commands') {
      setRetornoTerminal(
        "/play /monster /cafe /lofi /recruiter /share /xp /tempo\n"+
        "/secret /matrix /sudo-hack /rickroll /dev /clear\n"+
        "/colors /dracula /matrix-theme /cyberpunk-theme\n"+
        "/github /linkedin /linkedin-mode /sobre /projects"
      );
    } else {
      setRetornoTerminal(t.comandoInvalido);
    }
  };

  const interagirComSeguranca = () => {
    setContadorGlitch(p => {
      const n = p + 1;
      if (n >= 6) {
        setGlitchAtivo(true);
        setTimeout(() => { setTelaAzul(true); setTimeout(() => { setTelaAzul(false); setGlitchAtivo(false); setRetornoTerminal("> CORE RESTORED IN SAFE MODE."); }, 2000); }, 800);
        return 0;
      }
      return n;
    });
  };

  const abrirConfiguracoes = () => {
    interagirComSeguranca();
    setMenuAberto(m => !m);
    desbloquearConquista("curioso","Curioso: Abriu as configurações!","⚙️");
    ganharXP('abrir_painel');
  };

  const proximaMusica  = () => setMusicaAtualIndex(i => (i+1) % playlist.length);
  const musicaAnterior = () => setMusicaAtualIndex(i => (i-1+playlist.length) % playlist.length);

  useEffect(() => {
    if (!audioRef.current) return;
    if (musicaAtiva) {
      audioRef.current.load();
      audioRef.current.play().catch(() => setMusicaAtiva(false));
      desbloquearConquista("dj","DJ do Ciberespaço!","📻");
    } else {
      audioRef.current.pause();
    }
  }, [musicaAtiva, musicaAtualIndex, playlist, desbloquearConquista]);

  const iniciarArrastar = (e) => {
    isDragging.current = true; hasMoved.current = false;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    dragStart.current = { x:cx, y:cy };
    dragStartPos.current = { x:btnPos.x, y:btnPos.y };
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = cx - dragStart.current.x, dy = cy - dragStart.current.y;
      if (Math.abs(dx)>4||Math.abs(dy)>4) hasMoved.current = true;
      setBtnPos({ x: Math.max(10,Math.min(window.innerWidth-50,dragStartPos.current.x+dx)), y: Math.max(10,Math.min(window.innerHeight-50,dragStartPos.current.y+dy)) });
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [btnPos]);

  useEffect(() => {
    try {
      const v = parseInt(localStorage.getItem('portfolio_visitas_user')||'0') + 1;
      localStorage.setItem('portfolio_visitas_user', v);
      setContadorVisitas(3412 + v);
    } catch { setContadorVisitas(3412); }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const mv = (e) => { root.style.setProperty('--mouse-x',`${e.clientX}px`); root.style.setProperty('--mouse-y',`${e.clientY}px`); };
    const tm = (e) => { if(e.touches.length>0){ root.style.setProperty('--mouse-x',`${e.touches[0].clientX}px`); root.style.setProperty('--mouse-y',`${e.touches[0].clientY}px`); } };
    window.addEventListener('mousemove', mv);
    window.addEventListener('touchmove', tm, { passive:true });
    window.addEventListener('touchstart', tm, { passive:true });
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('touchmove', tm); window.removeEventListener('touchstart', tm); };
  }, []);

  useEffect(() => { document.body.classList.toggle('lanterna-ativa', lanternaAtiva); document.documentElement.style.setProperty('--lanterna-opacity', lanternaAtiva?'1':'0'); }, [lanternaAtiva]);
  useEffect(() => { document.body.classList.toggle('disable-animations', !animacoesAtivas); }, [animacoesAtivas]);
  useEffect(() => { document.documentElement.style.setProperty('--card-blur', `${nivelBlur}px`); }, [nivelBlur]);
  useEffect(() => { document.documentElement.style.setProperty('--font-family', fonteSelecionada); }, [fonteSelecionada]);
  useEffect(() => { document.documentElement.style.setProperty('--font-size-base', `${tamanhoFonte}px`); document.documentElement.style.fontSize = `${tamanhoFonte}px`; }, [tamanhoFonte]);
  useEffect(() => { document.body.classList.toggle('cyber-glitch-active', glitchAtivo); }, [glitchAtivo]);
  useEffect(() => {
    const mapaFiltros = {
      nenhum: 'none',
      protanopia: 'url(#filtro-protanopia)',
      deuteranopia: 'url(#filtro-deuteranopia)',
      tritanopia: 'url(#filtro-tritanopia)',
      acromatopsia: 'url(#filtro-acromatopsia)',
    };
    document.documentElement.style.filter = mapaFiltros[modoDaltonismo] || 'none';
    try { localStorage.setItem('portfolio_daltonismo', modoDaltonismo); } catch {}
  }, [modoDaltonismo]);

  const aoSelecionarCorPicker = (hex) => { setCorHexInput(hex); setCorHexErro(false); mudarCorPrincipal(hex); };
  const aoDigitarCorHex = (v) => { setCorHexInput(v); if(hexValido(v)){setCorHexErro(false);mudarCorPrincipal(v);}else{setCorHexErro(true);} };

  const aoSelecionarCorFundoPicker = (hex) => { setCorFundoHexInput(hex); setCorFundoErro(false); mudarCorFundo(hex); };
  const aoDigitarCorFundoHex = (v) => { setCorFundoHexInput(v); if(hexValido(v)){setCorFundoErro(false);mudarCorFundo(v);}else{setCorFundoErro(true);} };

  useEffect(() => { try { localStorage.setItem('portfolio_cursor_estilo', cursorEstilo); } catch {} }, [cursorEstilo]);
  useEffect(() => { try { localStorage.setItem('portfolio_cursor_imagens', JSON.stringify(cursorImagens)); } catch {} }, [cursorImagens]);
  useEffect(() => { try { localStorage.setItem('portfolio_cursor_imagem_id', cursorImagemId); } catch {} }, [cursorImagemId]);
  useEffect(() => { try { localStorage.setItem('portfolio_cursor_tamanho', String(cursorTamanho)); } catch {} }, [cursorTamanho]);
  useEffect(() => { if (hexValido(cursorCorInput)) { try { localStorage.setItem('portfolio_cursor_cor', cursorCorInput); } catch {} } }, [cursorCorInput]);

  useEffect(() => { try { localStorage.setItem('portfolio_trail_estilo', trailEstilo); } catch {} }, [trailEstilo]);
  useEffect(() => { try { localStorage.setItem('portfolio_trail_emoji', trailEmoji); } catch {} }, [trailEmoji]);
  useEffect(() => { try { localStorage.setItem('portfolio_trail_intensidade', String(trailIntensidade)); } catch {} }, [trailIntensidade]);
  useEffect(() => { try { localStorage.setItem('portfolio_trail_autoperf', String(trailAutoPerf)); } catch {} }, [trailAutoPerf]);
  useEffect(() => { try { localStorage.setItem('portfolio_trail_cor_auto', String(trailCorAuto)); } catch {} }, [trailCorAuto]);
  useEffect(() => { if (hexValido(trailCorInput)) { try { localStorage.setItem('portfolio_trail_cor', trailCorInput); } catch {} } }, [trailCorInput]);

  const aoSelecionarCorCursor = (hex) => { setCursorCorInput(hex); setCursorCorErro(false); };
  const aoDigitarCorCursor = (v) => { setCursorCorInput(v); setCursorCorErro(!hexValido(v)); };

  const aoSelecionarCorTrail = (hex) => { setTrailCorInput(hex); setTrailCorErro(false); setTrailCorAuto(false); };
  const aoDigitarCorTrail = (v) => { setTrailCorInput(v); setTrailCorErro(!hexValido(v)); setTrailCorAuto(false); };

  const corRastroEfetiva = trailCorAuto
    ? (hexValido(cursorCorInput) ? cursorCorInput : '#4b80e2')
    : (hexValido(trailCorInput) ? trailCorInput : '#4b80e2');

  return (
    <>
      {carregando ? (
        <div style={{ position:'fixed', inset:0, background:'#000', color:'#00ff41', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace', zIndex:999999 }}>
          <div style={{ textAlign:'left', maxWidth:'80%' }}>
            {linhasBoot.map((l,i) => <div key={i} style={{ margin:'5px 0' }}>{l}</div>)}
            <div className="boot-blinking-cursor">_</div>
          </div>
        </div>
      ) : (
        <>
          {telaAzul && (
            <div style={{ position:'fixed', inset:0, background:'#0000aa', color:'#fff', fontFamily:'monospace', padding:'40px', zIndex:100000, display:'flex', flexDirection:'column', justifyContent:'center' }}>
              <h1 style={{ fontSize:'3rem', marginBottom:'20px' }}>:( SYSTEM_ERROR</h1>
              <p>A fatal exception 0x0000007B has occurred at core memory structure mapping.</p>
              <p style={{ marginTop:'20px' }}>* System will attempt auto-recovery...</p>
            </div>
          )}
          {chuvaMatrix && <MatrixRainEffect />}
          {hackSim && (
            <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', color:'#00ff00', fontFamily:"'Fira Code',monospace", padding:'30px', zIndex:99998, pointerEvents:'none', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
              <div style={{ border:'1px solid #ff0055', padding:'20px', background:'#000', borderRadius:'8px', minWidth:'300px', boxShadow:'0 0 15px #ff0055' }}>
                <h3 style={{ color:'#ff0055', textAlign:'center', marginBottom:'15px' }}>⚠️ OVERRIDE PAYLOAD</h3>
                {linhasHack.map((l,i)=><div key={i} style={{ marginBottom:'8px', fontSize:'0.85rem' }}>{l}</div>)}
              </div>
            </div>
          )}
          {snakeAberto && <SnakeGame onClose={fecharSnake} />}
          {energeticoAtivo && <EnergeticoEasterEgg onClose={fecharEnergetico} imagemLata={imagemMonster} />}
          {cafeAtivo && <CafeEasterEgg onClose={fecharCafe} />}

          {conquistaAtiva && (
            <div className="achievement-popup">
              <div className="achievement-icon">{conquistaAtiva.icone}</div>
              <div className="achievement-info">
                <h5>CONQUISTA DESBLOQUEADA</h5>
                <p>{conquistaAtiva.titulo}</p>
              </div>
            </div>
          )}

          <BarraProgresso />
          <ToastBoasVindas />
          <BotaoTopo />
          {particulasAtivas && <ParticulasFundo />}

          {/* Cursors customizados com pointerEvents inline garantido para não travar cliques */}
          {cursorAtivo && (
            <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 999999 }}>
              <CustomCursorPointer
                estilo={cursorEstilo}
                cor={hexValido(cursorCorInput) ? cursorCorInput : '#4b80e2'}
                tamanho={cursorTamanho}
                customImage={cursorImagemAtual}
              />
            </div>
          )}
          {cursorTrailAtivo && (
            <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 999998 }}>
              <CursorTrailCanvas
                ativo={cursorTrailAtivo}
                estilo={trailEstilo}
                cor={corRastroEfetiva}
                intensidade={trailIntensidade}
                emoji={trailEmoji}
                autoPerf={trailAutoPerf}
                onPerfChange={aoMudarPerformance}
              />
            </div>
          )}

          <audio ref={audioRef} src={playlist[musicaAtualIndex]?.arquivo} loop />
          <FiltrosDaltonismo />
          

          <div onClick={interagirComSeguranca}><Header /></div>
          <About />
          <Projects />
          <Certificados />
          <Contact />
          <Footer />
          <DeveloperPanel
            xp={xp}
            xpLevel={xpLevel}
            conquistas={conquistasDesbloqueadas}
            totalConquistas={LISTA_CONQUISTAS.length}
            tempoSegundos={tempoSegundos}
            musicaAtiva={musicaAtiva}
            idioma={idioma}
          />

          {/* Botão de engrenagem livre fora da div do painel de cores */}
          <button
            className="botao-engrenagem"
            onMouseDown={iniciarArrastar}
            onTouchStart={iniciarArrastar}
            onClick={() => { if(!hasMoved.current) abrirConfiguracoes(); }}
            style={{ 
              position:'fixed', 
              left: menuAberto ? 'auto' : `${btnPos.x}px`, 
              right: menuAberto ? '330px' : 'auto', 
              top: menuAberto ? '20px' : `${btnPos.y}px`, 
              zIndex: 100001, 
              touchAction: 'none', 
              cursor: isDragging.current ? 'grabbing' : 'pointer', 
              transition: isDragging.current ? 'none' : 'left 0.3s ease, right 0.3s ease, top 0.3s ease' 
            }}
          >
            {menuAberto ? "×" : "⚙️"}
          </button>

          {/* Gaveta do Gerenciador de Cores/Configurações */}
          <div 
            className={`GerenciadorCores ${menuAberto ? "aberto" : ""}`}
            style={{
              pointerEvents: menuAberto ? 'auto' : 'none'
            }}
          >
            <div className="conteudo-cores" style={{ display:'flex', flexDirection:'column', gap:'15px', maxHeight:'85vh', overflowY:'auto' }}>

              {/* Inserção do Widget Google Translate */}
              <div style={{ background:'rgba(0,0,0,0.4)', padding:'10px', borderRadius:'8px', border:'1px solid var(--border-neon)' }}>
                <span style={{ fontSize:'0.7rem', color:'var(--text-gray)', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'8px', textAlign:'center' }}>
                  🌐 Traduzir Página
                </span>
                <GoogleTranslate />
              </div>

              <div style={{ background:'rgba(0,0,0,0.4)', padding:'10px', borderRadius:'8px', border:'1px solid var(--border-neon)' }}>
                <span style={{ fontSize:'0.7rem', color:'var(--text-gray)', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'8px', textAlign:'center' }}>
                  Cor de Fundo
                </span>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {CORES_FUNDO_PRE_PRONTAS.map((cor) => (
                    <button
                      key={cor.hex}
                      title={cor.nome}
                      onClick={() => { setCorFundoHexInput(cor.hex); setCorFundoErro(false); mudarCorFundo(cor.hex); }}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: cor.hex,
                        border: corFundo === cor.hex ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.2)',
                        boxShadow: corFundo === cor.hex ? '0 0 8px var(--primary)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    />
                  ))}
                </div>

                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginTop:'10px' }}>
                  <input
                    type="color"
                    value={hexValido(corFundoHexInput) && corFundoHexInput.length===7 ? corFundoHexInput : '#050505'}
                    onChange={(e) => aoSelecionarCorFundoPicker(e.target.value)}
                    style={{ width:'42px', height:'42px', cursor:'pointer', background:'transparent', border:'1px solid var(--border-neon)', borderRadius:'8px' }}
                  />
                  <input
                    type="text"
                    value={corFundoHexInput}
                    onChange={(e) => aoDigitarCorFundoHex(e.target.value)}
                    maxLength={7}
                    style={{ width:'100%', padding:'10px', background:'#0d0d0d', color:'#fff', border:'1px solid #222', borderRadius:'8px', fontFamily:"'Fira Code',monospace" }}
                  />
                </div>
                {corFundoErro && <span style={{ color:'#ff4a4a', fontSize:'0.75rem' }}>{t.corHexInvalida}</span>}
              </div>

              <div style={{ textAlign:'center' }}><Clock /></div>

              <div style={{ background:'rgba(0,0,0,0.4)', padding:'10px', borderRadius:'8px', border:'1px solid var(--border-neon)', textAlign:'center' }}>
                <span style={{ fontSize:'0.7rem', color:'var(--text-gray)', letterSpacing:'1px', textTransform:'uppercase', display:'block', marginBottom:'4px' }}>{t.sistemaConectado}</span>
                <div style={{ fontFamily:"'Fira Code',monospace", color:'var(--primary)', fontWeight:'bold', fontSize:'1.1rem', letterSpacing:'2px' }}>
                  Nº SYS_{String(contadorVisitas).padStart(6,'0')}
                </div>
              </div>

              <div style={{ background:'rgba(0,0,0,0.3)', padding:'10px', borderRadius:'8px', border:'1px solid var(--border-neon)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px' }}>
                  <span style={{ fontSize:'0.75rem', color:'var(--text-gray)' }}>⭐ {t.xpLabel} — Lv.{xpLevel}</span>
                  <span style={{ fontFamily:"'Fira Code',monospace", fontSize:'0.75rem', color:'var(--primary)' }}>{xp} XP</span>
                </div>
                <div style={{ height:'6px', background:'rgba(255,255,255,0.08)', borderRadius:'3px', overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${(xp % 100)}%`, background:'var(--primary)', boxShadow:'0 0 6px var(--primary)', transition:'width 0.3s ease', borderRadius:'3px' }} />
                </div>
                <div style={{ marginTop:'8px', fontSize:'0.75rem', color:'var(--text-gray)', display:'flex', justifyContent:'space-between' }}>
                  <span>⏱️ {t.tempoLabel}</span>
                  <span style={{ fontFamily:"'Fira Code',monospace", color:'var(--primary)' }}>{formatarTempo(tempoSegundos)}</span>
                </div>
              </div>

              <div className="mini-terminal-container">
                <input type="text" className="terminal-input" value={comandoInput} onChange={(e) => setComandoInput(e.target.value)} onKeyDown={executarComando} placeholder={t.terminalPlaceholder} />
                {retornoTerminal && <div className="terminal-return" style={{ whiteSpace:'pre-line', fontSize:'0.8rem', marginTop:'6px', color:'var(--primary)' }}>{retornoTerminal}</div>}
              </div>

              <button onClick={copiarLinkTema} style={{ ...styles.fontBtn, border:'1px solid var(--border-neon)', color:'var(--primary)', fontSize:'0.78rem' }}>
                🔗 Compartilhar Tema
              </button>

              {/* 🎧 UPLOAD DE MÚSICAS PRÓPRIAS */}
              <div style={{ background:'rgba(0,0,0,0.4)', padding:'12px', borderRadius:'8px', border:'1px solid var(--border-neon)' }}>
                <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '0.9rem' }}>{t.uploadMusicaTitulo}</h4>
                <p style={{ fontSize: '0.72rem', color: '#888', margin: '4px 0 10px 0' }}>{t.uploadMusicaSub}</p>
                
                <input
                  ref={inputAudioRef}
                  type="file"
                  accept="audio/*"
                  multiple
                  onChange={subirAudioCustom}
                  style={{ display: 'none' }}
                />

                <button
                  onClick={() => inputAudioRef.current?.click()}
                  style={{ ...styles.fontBtn, width: '100%', padding: '8px', border: '1px dashed var(--primary)', color: 'var(--primary)', fontSize: '0.8rem' }}
                >
                  {t.uploadMusicaBotao}
                </button>

                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {playlist.map((faixa, index) => (
                    <div
                      key={faixa.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        background: musicaAtualIndex === index ? 'rgba(var(--primary-rgb), 0.2)' : '#0d0d0d',
                        border: musicaAtualIndex === index ? '1px solid var(--primary)' : '1px solid #1a1a1a',
                        fontSize: '0.75rem'
                      }}
                    >
                      <span
                        onClick={() => { setMusicaAtualIndex(index); setMusicaAtiva(true); }}
                        style={{ cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, color: musicaAtualIndex === index ? 'var(--primary)' : '#fff' }}
                        title={faixa.nome}
                      >
                        {musicaAtualIndex === index ? "▶ " : ""}{faixa.nome}
                      </span>

                      {faixa.custom && (
                        <button
                          onClick={() => removerMusicaCustom(faixa.id)}
                          style={{ background: 'none', border: 'none', color: '#ff4a4a', cursor: 'pointer', fontSize: '0.85rem', padding: '0 4px' }}
                          title="Remover música"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="secao-conquistas-painel">
                <h4 style={{ margin:0 }}>{t.conquistasTitulo} ({conquistasDesbloqueadas.length}/{LISTA_CONQUISTAS.length})</h4>
                <div className="lista-conquistas-grid">
                  {LISTA_CONQUISTAS.map(c => {
                    const ok = conquistasDesbloqueadas.includes(c.id);
                    return (
                      <div key={c.id} className={`item-conquista-status ${ok?'desbloqueada':'bloqueada'}`}>
                        <div className="icone-conquista-status">{ok ? c.icone : "🔒"}</div>
                        <div className="info-conquista-status"><h6>{c.titulo}</h6><p>{c.desc}</p></div>
                      </div>
                    );
                  })}
                </div>
                {conquistasDesbloqueadas.length > 0 && (
                  <button onClick={limparConquistas} style={{ ...styles.fontBtn, marginTop:'12px', background:'#2a0808', border:'1px solid #ff4a4a', color:'#ff8888', fontSize:'0.8rem' }}>
                    {t.limparConquistas}
                  </button>
                )}
              </div>

              <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,0.08)' }} />

              <GitHubFeed />

              <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,0.08)' }} />

              <div>
                <h4>{t.idiomaLabel}</h4>
                <div style={{ display:'flex', gap:'6px', marginTop:'8px' }}>
                  <button onClick={() => setIdioma('pt')} style={{ ...styles.fontBtn, border: idioma==='pt'?'1px solid var(--primary)':'1px solid #222' }}>PT-BR</button>
                  <button onClick={() => setIdioma('en')} style={{ ...styles.fontBtn, border: idioma==='en'?'1px solid var(--primary)':'1px solid #222' }}>EN</button>
                </div>
              </div>

              <div>
                <h4>{t.corDestaque}</h4>
                {!mestreDoSistema ? (
                  <div style={{ marginTop:'8px' }}>
                    <span style={{ fontSize:'0.75rem', color:'#888', display:'block', marginBottom:'8px' }}>
                      {idioma==='pt' ? "🔒 Conclua as conquistas para o Seletor Hexadecimal!" : "🔒 Complete achievements for Hex Color Picker!"}
                    </span>
                    <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                      {CORES_PRE_PRONTAS.map(c => (
                        <button key={c.hex} onClick={() => { setCorHexInput(c.hex); setCorHexErro(false); mudarCorPrincipal(c.hex); }}
                          style={{ width:'28px', height:'28px', borderRadius:'50%', background:c.hex, border:corHexInput.toLowerCase()===c.hex.toLowerCase()?'2px solid #fff':'1px solid #000', cursor:'pointer' }}
                          title={c.nome}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginTop:'8px' }}>
                    <input type="color" value={hexValido(corHexInput)&&corHexInput.length===7?corHexInput:'#4b80e2'} onChange={(e)=>aoSelecionarCorPicker(e.target.value)} style={{ width:'42px', height:'42px', cursor:'pointer', background:'transparent', border:'1px solid var(--border-neon)', borderRadius:'8px' }} />
                    <input type="text" value={corHexInput} onChange={(e)=>aoDigitarCorHex(e.target.value)} maxLength={7} style={{ width:'100%', padding:'10px', background:'#0d0d0d', color:'#fff', border:'1px solid #222', borderRadius:'8px', fontFamily:"'Fira Code',monospace" }} />
                  </div>
                )}
                {corHexErro && <span style={{ color:'#ff4a4a', fontSize:'0.75rem' }}>{t.corHexInvalida}</span>}
              </div>

              <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,0.08)' }} />

              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <h4 style={{ margin:0 }}>{t.corTexto}</h4>
                  {!textoAuto && (
                    <button onClick={ativarCorTextoAutomatica} style={{ ...styles.fontBtn, flex:'0 0 auto', padding:'4px 8px', fontSize:'0.7rem', border:'1px solid var(--border-neon)' }}>
                      {t.corTextoAutoBotao}
                    </button>
                  )}
                </div>

                {textoAuto && modoTextoEscuro && (
                  <div style={{ marginTop:'8px', padding:'8px 10px', background:'rgba(0,0,0,0.3)', border:'1px solid var(--border-neon)', borderRadius:'8px', fontSize:'0.75rem', textAlign:'center' }}>
                    {t.corTextoAutoBadge}
                  </div>
                )}

                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginTop:'10px' }}>
                  {CORES_TEXTO_PRE_PRONTAS.map(c => (
                    <button key={c.hex} onClick={() => aoSelecionarCorTextoPicker(c.hex)}
                      style={{ width:'28px', height:'28px', borderRadius:'50%', background:c.hex, border:!textoAuto && corTextoInput.toLowerCase()===c.hex.toLowerCase()?'2px solid var(--primary)':'1px solid rgba(255,255,255,0.3)', cursor:'pointer' }}
                      title={c.nome}
                    />
                  ))}
                </div>

                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginTop:'10px' }}>
                  <input
                    type="color"
                    value={hexValido(corTextoInput) && corTextoInput.length===7 ? corTextoInput : '#ffffff'}
                    onChange={(e) => aoSelecionarCorTextoPicker(e.target.value)}
                    style={{ width:'42px', height:'42px', cursor:'pointer', background:'transparent', border:'1px solid var(--border-neon)', borderRadius:'8px' }}
                  />
                  <input
                    type="text"
                    value={corTextoInput}
                    onChange={(e) => aoDigitarCorTextoHex(e.target.value)}
                    maxLength={7}
                    style={{ width:'100%', padding:'10px', background:'#0d0d0d', color:'#fff', border:'1px solid #222', borderRadius:'8px', fontFamily:"'Fira Code',monospace" }}
                  />
                </div>
                {corTextoErro && <span style={{ color:'#ff4a4a', fontSize:'0.75rem' }}>{t.corHexInvalida}</span>}
              </div>

              <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,0.08)' }} />

              <div>
                <h4>{t.daltonismoLabel}</h4>
                <select
                  value={modoDaltonismo}
                  onChange={(e) => setModoDaltonismo(e.target.value)}
                  style={{ width:'100%', marginTop:'8px', padding:'8px 10px', background:'#0d0d0d', color:'#fff', border:'1px solid #222', borderRadius:'8px', fontSize:'0.85rem', cursor:'pointer' }}
                >
                  <option value="nenhum">{t.daltonismoNenhum}</option>
                  <option value="protanopia">{t.daltonismoProtanopia}</option>
                  <option value="deuteranopia">{t.daltonismoDeuteranopia}</option>
                  <option value="tritanopia">{t.daltonismoTritanopia}</option>
                  <option value="acromatopsia">{t.daltonismoAcromatopsia}</option>
                </select>

                {modoDaltonismo !== 'nenhum' && (
                  <div style={{ marginTop:'10px', padding:'8px 10px', background:'rgba(var(--primary-rgb),0.1)', border:'1px solid var(--primary)', borderRadius:'8px', fontSize:'0.75rem', color:'var(--primary)', textAlign:'center' }}>
                    {t.daltonismoCredito}
                  </div>
                )}
              </div>

              <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,0.08)' }} />

              <div>
                <h4>{t.tipografia}</h4>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginTop:'8px' }}>
                  {FONTES_DISPONIVEIS.map(f => (
                    <button key={f.valor} onClick={() => setFonteSelecionada(f.valor)}
                      style={{ ...styles.fontBtn, fontFamily:f.valor, fontSize:'0.75rem', border:fonteSelecionada===f.valor?'1px solid var(--primary)':'1px solid #222' }}>
                      {f.nome}
                    </button>
                  ))}
                </div>

                {fontesCustom.length > 0 && (
                  <div style={{ marginTop:'10px' }}>
                    <span style={{ fontSize:'0.75rem', color:'#888' }}>{t.minhasFontes}</span>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginTop:'6px' }}>
                      {fontesCustom.map(f => (
                        <div key={f.valor} style={{ position:'relative' }}>
                          <button onClick={() => setFonteSelecionada(f.valor)}
                            style={{ ...styles.fontBtn, fontFamily:f.valor, fontSize:'0.75rem', width:'100%', border:fonteSelecionada===f.valor?'1px solid var(--primary)':'1px solid #222' }}>
                            {f.nome}
                          </button>
                          <span onClick={() => removerFonteCustom(f.valor)}
                            title={idioma==='pt' ? 'Remover fonte' : 'Remove font'}
                            style={{ position:'absolute', top:'-6px', right:'-6px', background:'#2a0808', border:'1px solid #ff4a4a', color:'#ff8888', borderRadius:'50%', width:'16px', height:'16px', fontSize:'0.65rem', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                            ×
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ marginTop:'14px' }}>
                  <span style={{ fontSize:'0.8rem', color:'#a9a9a9', display:'block', marginBottom:'6px' }}>{t.buscarFonteLabel}</span>
                  <div style={{ display:'flex', gap:'6px', position:'relative' }}>
                    <input
                      type="text"
                      value={buscaFonteInput}
                      onChange={(e) => { setBuscaFonteInput(e.target.value); setErroFonte(''); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') instalarFonteGoogle(buscaFonteInput); }}
                      placeholder={t.buscarFontePlaceholder}
                      style={{ flex:1, padding:'8px 10px', background:'#0d0d0d', color:'#fff', border:'1px solid #222', borderRadius:'6px', fontSize:'0.8rem' }}
                    />
                    <button
                      onClick={() => instalarFonteGoogle(buscaFonteInput)}
                      disabled={carregandoFonte || !buscaFonteInput.trim()}
                      style={{ ...styles.fontBtn, flex:'0 0 auto', padding:'8px 12px', opacity:carregandoFonte?0.6:1, border:'1px solid var(--primary)', color:'var(--primary)' }}>
                      {carregandoFonte ? '⏳' : '🔍'}
                    </button>

                    {sugestoesFontes.length > 0 && (
                      <div style={{ position:'absolute', top:'100%', left:0, right:0, marginTop:'4px', background:'#0d0d0d', border:'1px solid #222', borderRadius:'6px', zIndex:5, overflow:'hidden' }}>
                        {sugestoesFontes.map(nome => (
                          <div key={nome} onClick={() => instalarFonteGoogle(nome)}
                            style={{ padding:'8px 10px', fontSize:'0.8rem', cursor:'pointer', borderBottom:'1px solid #1a1a1a' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(var(--primary-rgb),0.15)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                            {nome}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {carregandoFonte && <span style={{ fontSize:'0.7rem', color:'#888', display:'block', marginTop:'4px' }}>{t.buscarFonteCarregando}</span>}
                  {erroFonte && <span style={{ fontSize:'0.7rem', color:'#ff4a4a', display:'block', marginTop:'4px' }}>{erroFonte}</span>}
                  {sucessoFonte && <span style={{ fontSize:'0.7rem', color:'#4ade80', display:'block', marginTop:'4px' }}>{t.buscarFonteSucesso}</span>}

                  <details style={{ marginTop:'10px' }}>
                    <summary style={{ fontSize:'0.7rem', color:'#666', cursor:'pointer' }}>{t.apiKeyLabel}</summary>
                    <input
                      type="text"
                      value={googleApiKey}
                      onChange={(e) => salvarApiKeyGoogleFonts(e.target.value)}
                      placeholder={t.apiKeyPlaceholder}
                      style={{ width:'100%', marginTop:'6px', padding:'8px 10px', background:'#0d0d0d', color:'#fff', border:'1px solid #222', borderRadius:'6px', fontSize:'0.75rem' }}
                    />
                  </details>
                </div>
              </div>

              <div>
                <div style={styles.controlRow}>
                  <span>{t.tamanhoFonteLabel}</span>
                  <span style={{ fontFamily:"'Fira Code',monospace", color:'var(--primary)' }}>{tamanhoFonte}px</span>
                </div>
                <input type="range" min="12" max="24" value={tamanhoFonte} onChange={(e)=>setTamanhoFonte(Number(e.target.value))} style={{ width:'100%', accentColor:'var(--primary)' }} />
              </div>

              <div>
                <div style={styles.controlRow}>
                  <span>{t.opacidadeVidro}</span>
                  <span style={{ fontFamily:"'Fira Code',monospace", color:'var(--primary)' }}>{nivelBlur}px</span>
                </div>
                <input type="range" min="0" max="20" value={nivelBlur} onChange={(e)=>setNivelBlur(Number(e.target.value))} style={{ width:'100%', accentColor:'var(--primary)' }} />
              </div>

              <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,0.08)' }} />

              <div>
                <h4 style={{ marginBottom:'10px' }}>{t.efeitosSistema}</h4>
                <div style={styles.controlRow}><span>{t.lanterna}</span><input type="checkbox" checked={lanternaAtiva} onChange={(e)=>setLanternaAtiva(e.target.checked)} style={styles.checkbox}/></div>
                <div style={styles.controlRow}><span>{t.animacoes}</span><input type="checkbox" checked={animacoesAtivas} onChange={(e)=>setAnimacoesAtivas(e.target.checked)} style={styles.checkbox}/></div>
                <div style={styles.controlRow}><span>{t.particulas}</span><input type="checkbox" checked={particulasAtivas} onChange={(e)=>setParticulasAtivas(e.target.checked)} style={styles.checkbox}/></div>
                <div style={styles.controlRow}><span>{t.glitch}</span><input type="checkbox" checked={glitchAtivo} onChange={(e)=>setGlitchAtivo(e.target.checked)} style={styles.checkbox}/></div>
                <div style={styles.controlRow}><span>Modo Lo-Fi</span><input type="checkbox" checked={lofiMode} onChange={(e)=>setLofiMode(e.target.checked)} style={styles.checkbox}/></div>
                <div style={styles.controlRow}><span>Modo Recrutador</span><input type="checkbox" checked={recruiterMode} onChange={(e)=>setRecruiterMode(e.target.checked)} style={styles.checkbox}/></div>

                <div style={{ ...styles.controlRow, flexDirection:'column', alignItems:'stretch', gap:'8px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span>{t.trilhaSonora}</span>
                    <input type="checkbox" checked={musicaAtiva} onChange={(e)=>setMusicaAtiva(e.target.checked)} style={styles.checkbox}/>
                  </div>
                  <div style={{ background:'#000', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'6px', padding:'8px' }}>
                    <div style={{ fontFamily:"'Fira Code',monospace", fontSize:'0.75rem', color:musicaAtiva?'var(--primary)':'#666', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap', marginBottom:'6px' }}>{playlist[musicaAtualIndex]?.nome}</div>
                    <div style={{ display:'flex', justifyContent:'center', gap:'15px' }}>
                      <button onClick={musicaAnterior} style={{ background:'none', border:'none', color:'#fff', cursor:'pointer' }}>⏮</button>
                      <button onClick={proximaMusica}  style={{ background:'none', border:'none', color:'#fff', cursor:'pointer' }}>⏭</button>
                    </div>
                  </div>
                </div>
              </div>

              <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,0.08)' }} />

              <div>
                <h4 style={{ marginBottom:'4px' }}>🖱️ Cursor & Rastro</h4>
                <span style={{ fontSize:'0.72rem', color:'#888', display:'block', marginBottom:'10px' }}>
                  Personalize a forma, cor e o rastro do cursor.
                </span>

                <div style={{
                  display:'flex', alignItems:'center', justifyContent:'center',
                  height:'56px', background:'rgba(0,0,0,0.4)', borderRadius:'8px',
                  border:'1px dashed var(--border-neon)', marginBottom:'12px'
                }}>
                  <FormaCursor
                    estilo={cursorEstilo}
                    cor={hexValido(cursorCorInput) ? cursorCorInput : '#4b80e2'}
                    tamanho={Math.min(cursorTamanho, 40)}
                    customImage={cursorImagemAtual}
                  />
                </div>

                <div style={styles.controlRow}>
                  <span>Ativar cursor customizado</span>
                  <input type="checkbox" checked={cursorAtivo} onChange={(e)=>setCursorAtivo(e.target.checked)} style={styles.checkbox}/>
                </div>

                <div style={{ opacity: cursorAtivo ? 1 : 0.4, pointerEvents: cursorAtivo ? 'auto' : 'none', transition:'opacity 0.2s' }}>
                  <span style={{ fontSize:'0.75rem', color:'#a9a9a9', display:'block', margin:'6px 0' }}>Forma</span>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'6px' }}>
                    {CURSOR_ESTILOS.map(op => (
                      <button
                        key={op.id}
                        onClick={() => setCursorEstilo(op.id)}
                        title={op.nome}
                        style={{
                          display:'flex', flexDirection:'column', alignItems:'center', gap:'4px',
                          padding:'8px 4px', background:'#0d0d0d', borderRadius:'8px', cursor:'pointer',
                          border: cursorEstilo === op.id ? '1px solid var(--primary)' : '1px solid #222',
                        }}
                      >
                        <FormaCursor estilo={op.id} cor={cursorEstilo === op.id ? (hexValido(cursorCorInput) ? cursorCorInput : '#4b80e2') : '#888'} tamanho={20} customImage={cursorImagemAtual} />
                        <span style={{ fontSize:'0.62rem', color:'#a9a9a9' }}>{op.nome}</span>
                      </button>
                    ))}
                  </div>

                  <span style={{ fontSize:'0.75rem', color:'#a9a9a9', display:'block', margin:'12px 0 6px' }}>🖼️ Imagem importada</span>
                  <div style={{ background:'rgba(0,0,0,0.4)', border:'1px solid var(--border-neon)', borderRadius:'8px', padding:'10px' }}>
                    <input
                      ref={inputImagemCursorRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={importarImagensCursor}
                      style={{ display:'none' }}
                    />
                    <button
                      onClick={() => inputImagemCursorRef.current?.click()}
                      style={{ width:'100%', padding:'8px', background:'#0d0d0d', color:'#fff', border:'1px dashed var(--primary)', borderRadius:'8px', cursor:'pointer', fontSize:'0.78rem' }}
                    >
                      + Importar imagem (PNG, SVG, GIF — máx. 500KB)
                    </button>

                    {cursorImagemErro && (
                      <span style={{ color:'#ff4a4a', fontSize:'0.72rem', display:'block', marginTop:'6px' }}>{cursorImagemErro}</span>
                    )}

                    {cursorImagens.length === 0 ? (
                      <span style={{ fontSize:'0.7rem', color:'#666', display:'block', marginTop:'8px', textAlign:'center' }}>
                        Nenhuma imagem importada ainda.
                      </span>
                    ) : (
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'6px', marginTop:'10px' }}>
                        {cursorImagens.map(img => {
                          const selecionada = cursorImagemId === img.id && cursorEstilo === 'custom-image';
                          return (
                            <div
                              key={img.id}
                              title={img.nome}
                              style={{ position:'relative', background:'#0d0d0d', borderRadius:'8px', padding:'8px 4px', border: selecionada ? '1px solid var(--primary)' : '1px solid #222' }}
                            >
                              <button
                                onClick={() => { setCursorImagemId(img.id); setCursorEstilo('custom-image'); }}
                                style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', width:'100%', background:'none', border:'none', cursor:'pointer', padding:0 }}
                              >
                                <img src={img.dados} alt={img.nome} style={{ width:'26px', height:'26px', objectFit:'contain' }} />
                                <span style={{ fontSize:'0.58rem', color:'#a9a9a9', maxWidth:'100%', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{img.nome}</span>
                              </button>
                              <button
                                onClick={() => removerImagemCursor(img.id)}
                                title="Remover imagem"
                                style={{ position:'absolute', top:'-6px', right:'-6px', width:'18px', height:'18px', lineHeight:'16px', textAlign:'center', background:'#1a1a1a', color:'#ff4a4a', border:'1px solid #ff4a4a', borderRadius:'50%', cursor:'pointer', fontSize:'0.7rem', padding:0 }}
                              >
                                ×
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize:'0.75rem', color:'#a9a9a9', display:'block', margin:'12px 0 6px' }}>Cor do cursor</span>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <input
                      type="color"
                      value={hexValido(cursorCorInput) && cursorCorInput.length===7 ? cursorCorInput : '#4b80e2'}
                      onChange={(e) => aoSelecionarCorCursor(e.target.value)}
                      style={{ width:'42px', height:'42px', cursor:'pointer', background:'transparent', border:'1px solid var(--border-neon)', borderRadius:'8px' }}
                    />
                    <input
                      type="text"
                      value={cursorCorInput}
                      onChange={(e) => aoDigitarCorCursor(e.target.value)}
                      maxLength={7}
                      style={{ width:'100%', padding:'10px', background:'#0d0d0d', color:'#fff', border:'1px solid #222', borderRadius:'8px', fontFamily:"'Fira Code',monospace" }}
                    />
                  </div>
                  {cursorCorErro && <span style={{ color:'#ff4a4a', fontSize:'0.75rem' }}>{t.corHexInvalida}</span>}

                  <div style={{ ...styles.controlRow, marginTop:'12px' }}>
                    <span>Tamanho</span>
                    <span style={{ fontFamily:"'Fira Code',monospace", color:'var(--primary)' }}>{cursorTamanho}px</span>
                  </div>
                  <input type="range" min="16" max="48" value={cursorTamanho} onChange={(e)=>setCursorTamanho(Number(e.target.value))} style={{ width:'100%', accentColor:'var(--primary)' }} />
                </div>

                <hr style={{ border:0, borderTop:'1px solid rgba(255,255,255,0.06)', margin:'14px 0' }} />

                <div style={styles.controlRow}>
                  <span>Ativar rastro (trail)</span>
                  <input type="checkbox" checked={cursorTrailAtivo} onChange={(e)=>setCursorTrailAtivo(e.target.checked)} style={styles.checkbox}/>
                </div>

                <div style={{ opacity: cursorTrailAtivo ? 1 : 0.4, pointerEvents: cursorTrailAtivo ? 'auto' : 'none', transition:'opacity 0.2s' }}>
                  <span style={{ fontSize:'0.75rem', color:'#a9a9a9', display:'block', margin:'6px 0' }}>Estilo do rastro</span>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px' }}>
                    {TRAIL_ESTILOS.filter(op => op.id !== 'none').map(op => (
                      <button
                        key={op.id}
                        onClick={() => setTrailEstilo(op.id)}
                        style={{ ...styles.fontBtn, fontSize:'0.75rem', border: trailEstilo === op.id ? '1px solid var(--primary)' : '1px solid #222' }}
                      >
                        {op.nome}
                      </button>
                    ))}
                  </div>

                  {trailEstilo === 'emoji' && (
                    <div style={{ marginTop:'10px' }}>
                      <span style={{ fontSize:'0.75rem', color:'#a9a9a9', display:'block', marginBottom:'6px' }}>Emoji do rastro</span>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'6px' }}>
                        {['⭐','🔥','💖','🌸','⚡','🍀','💀','🎵','🚀','🐍','☕','👾'].map(em => (
                          <button
                            key={em}
                            onClick={() => setTrailEmoji(em)}
                            style={{ ...styles.fontBtn, padding:'4px 8px', fontSize:'1rem', border: trailEmoji === em ? '1px solid var(--primary)' : '1px solid #222' }}
                          >
                            {em}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        maxLength={4}
                        value={trailEmoji}
                        onChange={(e) => setTrailEmoji(e.target.value || '⭐')}
                        placeholder="Cole qualquer emoji"
                        style={{ width:'100%', padding:'8px', background:'#0d0d0d', color:'#fff', border:'1px solid #222', borderRadius:'8px', textAlign:'center' }}
                      />
                    </div>
                  )}

                  <span style={{ fontSize:'0.75rem', color:'#a9a9a9', display:'block', margin:'12px 0 6px' }}>Cor do rastro</span>
                  <div style={{ display:'flex', gap:'6px', marginBottom:'8px' }}>
                    <button
                      onClick={() => setTrailCorAuto(true)}
                      style={{ ...styles.fontBtn, fontSize:'0.72rem', border: trailCorAuto ? '1px solid var(--primary)' : '1px solid #222' }}
                    >
                      Seguir cor do cursor
                    </button>
                    <button
                      onClick={() => setTrailCorAuto(false)}
                      style={{ ...styles.fontBtn, fontSize:'0.72rem', border: !trailCorAuto ? '1px solid var(--primary)' : '1px solid #222' }}
                    >
                      Manual
                    </button>
                  </div>
                  {!trailCorAuto && (
                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      <input
                        type="color"
                        value={hexValido(trailCorInput) && trailCorInput.length===7 ? trailCorInput : '#4b80e2'}
                        onChange={(e) => aoSelecionarCorTrail(e.target.value)}
                        style={{ width:'42px', height:'42px', cursor:'pointer', background:'transparent', border:'1px solid var(--border-neon)', borderRadius:'8px' }}
                      />
                      <input
                        type="text"
                        value={trailCorInput}
                        onChange={(e) => aoDigitarCorTrail(e.target.value)}
                        maxLength={7}
                        style={{ width:'100%', padding:'10px', background:'#0d0d0d', color:'#fff', border:'1px solid #222', borderRadius:'8px', fontFamily:"'Fira Code',monospace" }}
                      />
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </>
  );
}