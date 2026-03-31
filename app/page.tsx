'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1, title: 'Nasi Tumpeng Platform',
    role: 'Fullstack Developer',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    desc: 'Indonesian food business landing page with App Router, deployed live on Vercel.',
    link: 'https://nasi-tumpeng.vercel.app',
    color: '#00fff7',
  },
  {
    id: 2, title: 'Smart Contract Suite',
    role: 'Blockchain Developer',
    stack: ['Solidity', 'Hardhat', 'Ethers.js', 'OpenZeppelin'],
    desc: 'EVM-compatible smart contracts with automated testing pipelines and gas optimisation.',
    link: '#',
    color: '#ff00ff',
  },
  {
    id: 3, title: 'AI-Driven REST API',
    role: 'Backend / AI Engineer',
    stack: ['Node.js', 'Express', 'OpenAI API', 'PostgreSQL'],
    desc: 'Scalable API integrating LLM capabilities for intelligent data processing.',
    link: '#',
    color: '#ffe600',
  },
  {
    id: 4, title: 'Web3 DApp Interface',
    role: 'Frontend / Web3 Dev',
    stack: ['React', 'wagmi', 'RainbowKit', 'Viem'],
    desc: 'Decentralised app UI with wallet connection, contract reads/writes, and live state.',
    link: '#',
    color: '#00fff7',
  },
];

const WALLETS = [
  { label: 'EVM', addr: '0x8A75c5B1C01EB0Cf1E020E5A7d9dEC0231456cE0', color: '#00fff7' },
  { label: 'SOL', addr: '4SExsD92J4zRydmS2baUDiGgrzJp3BL4at2hMTHyRWZ1', color: '#ff00ff' },
  { label: 'TRX', addr: 'TEsxaNHA83Q4VfWKGdwLhaPs5QnGTkD26N', color: '#ffe600' },
];

const TERM_COMMANDS: Record<string, string> = {
  help:     '  COMMANDS:\n  whoami    → identity matrix\n  skills    → tech stack manifest\n  projects  → active deployments\n  contact   → establish link\n  wallet    → crypto addresses\n  clear     → wipe terminal\n  exit      → close overlay',
  whoami:   '  Sugeng Trianto :: Fullstack Developer & AI Enthusiast\n  Location  :: Malang, Indonesia\n  Exp       :: 3+ years\n  Focus     :: Fullstack · AI · Blockchain\n  GitHub    :: Elfastsasa1\n  Twitter   :: @Elfastsasa1',
  skills:   '  Languages :: TypeScript · JavaScript · Solidity · Python\n  Frontend  :: Next.js · React · Tailwind CSS\n  Backend   :: Node.js · Express · REST APIs\n  Chain     :: Hardhat · Ethers.js · OpenZeppelin\n  AI/ML     :: OpenAI · LangChain · Vector DBs\n  DevOps    :: Vercel · Docker · Git · CI/CD',
  projects: '  [01] Nasi Tumpeng Platform    → nasi-tumpeng.vercel.app\n  [02] Smart Contract Suite     → EVM / Hardhat\n  [03] AI-Driven REST API       → Node.js + OpenAI\n  [04] Web3 DApp Interface      → React + wagmi',
  contact:  '  Email    :: elfastsasa8@gmail.com\n  LinkedIn :: elfast-sasa-128a80275\n  Twitter  :: @Elfastsasa1\n  GitHub   :: Elfastsasa1',
  wallet:   '  EVM :: 0x8A75c5B1C01EB0Cf1E020E5A7d9dEC0231456cE0\n  SOL :: 4SExsD92J4zRydmS2baUDiGgrzJp3BL4at2hMTHyRWZ1\n  TRX :: TEsxaNHA83Q4VfWKGdwLhaPs5QnGTkD26N',
  clear:    '__CLEAR__',
  exit:     '__EXIT__',
};

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export default function Home() {
  const gridRef    = useRef<HTMLCanvasElement>(null);
  const matrixRef  = useRef<HTMLCanvasElement>(null);
  const termEndRef = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  const [termOpen, setTermOpen]       = useState(false);
  const [termInput, setTermInput]     = useState('');
  const [termLines, setTermLines]     = useState<{ t: 'cmd'|'out'; v: string }[]>([
    { t: 'out', v: '  > CYBERTERM v2.0 — type "help" to begin' },
  ]);
  const [matrixOn, setMatrixOn]       = useState(false);
  const [glitchOn, setGlitchOn]       = useState(false);
  const [copied, setCopied]           = useState('');
  const [form, setForm]               = useState({ name:'', email:'', msg:'' });
  const [sent, setSent]               = useState(false);
  const [certHover, setCertHover]     = useState(false);
  const lastY = useRef(0);

  /* ── Cyber grid ─────────────────────────────── */
  useEffect(() => {
    const c = gridRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    let raf: number; let t = 0;
    const draw = () => {
      c.width = window.innerWidth; c.height = window.innerHeight;
      ctx.clearRect(0,0,c.width,c.height);
      const step = 50; const off = t % step;
      ctx.strokeStyle = 'rgba(0,255,247,0.05)'; ctx.lineWidth = 1;
      for (let x = off - step; x < c.width + step; x += step) {
        ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,c.height); ctx.stroke();
      }
      for (let y = off - step; y < c.height + step; y += step) {
        ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(c.width,y); ctx.stroke();
      }
      // perspective diagonals from bottom center
      const bx = c.width/2; ctx.strokeStyle='rgba(255,0,255,0.025)';
      for (let i = 0; i <= 10; i++) {
        const tx = (i/10)*c.width;
        ctx.beginPath(); ctx.moveTo(bx, c.height); ctx.lineTo(tx, 0); ctx.stroke();
      }
      t += 0.4;
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  /* ── Matrix rain ────────────────────────────── */
  useEffect(() => {
    const c = matrixRef.current; if (!c) return;
    c.width = window.innerWidth; c.height = window.innerHeight;
    if (!matrixOn) return;
    const ctx = c.getContext('2d')!;
    const cols = Math.floor(c.width / 16);
    const drops = Array(cols).fill(1);
    const chars = 'アイウエオカキクサタナハヤラワ0123456789ABCDEF<>{}[]';
    let raf: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(10,10,10,0.06)';
      ctx.fillRect(0,0,c.width,c.height);
      ctx.font = '14px monospace';
      for (let i=0;i<drops.length;i++) {
        const ch = chars[Math.floor(Math.random()*chars.length)];
        const bright = Math.random() > 0.9;
        ctx.fillStyle = bright ? '#fff' : '#00ff41';
        ctx.fillText(ch, i*16, drops[i]*16);
        if (drops[i]*16 > c.height && Math.random()>0.975) drops[i]=0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [matrixOn]);

  /* ── Scroll → matrix trigger ─────────────────── */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastY.current);
      lastY.current = window.scrollY;
      if (delta > 80) {
        setMatrixOn(true);
        clearTimeout(timer);
        timer = setTimeout(() => setMatrixOn(false), 1800);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Periodic glitch on hero ─────────────────── */
  useEffect(() => {
    const id = setInterval(() => {
      setGlitchOn(true);
      setTimeout(()=>setGlitchOn(false), 250);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  /* ── Keyboard: ~ opens terminal ──────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key==='`'||e.key==='~') { e.preventDefault(); setTermOpen(p=>!p); }
      if (e.key==='Escape') setTermOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ── Auto-scroll terminal ────────────────────── */
  useEffect(() => {
    termEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [termLines]);

  /* ── Focus input when terminal opens ─────────── */
  useEffect(() => {
    if (termOpen) setTimeout(()=>inputRef.current?.focus(), 120);
  }, [termOpen]);

  /* ── Terminal submit ─────────────────────────── */
  const handleTerm = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const raw = termInput.trim().toLowerCase();
    if (!raw) return;
    const res = TERM_COMMANDS[raw];
    if (res==='__CLEAR__') {
      setTermLines([{ t:'out', v:'  > Terminal cleared.' }]);
    } else if (res==='__EXIT__') {
      setTermOpen(false);
    } else {
      setTermLines(prev => [
        ...prev,
        { t:'cmd', v:`$ ${termInput}` },
        { t:'out', v: res ?? `  > Unknown command: "${raw}". Type "help".` },
      ]);
    }
    setTermInput('');
  }, [termInput]);

  /* ── Copy wallet ─────────────────────────────── */
  const copyAddr = (addr: string, label: string) => {
    navigator.clipboard.writeText(addr).then(()=>{
      setCopied(label);
      setTimeout(()=>setCopied(''), 2000);
    });
  };

  /* ── Contact submit ──────────────────────────── */
  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name:'', email:'', msg:'' });
    setTimeout(()=>setSent(false), 4000);
  };

  /* ═══════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════ */
  return (
    <div style={{ position:'relative', minHeight:'100vh' }}>

      {/* Fixed canvases */}
      <canvas ref={gridRef} style={{ position:'fixed',top:0,left:0,zIndex:0,pointerEvents:'none' }} />
      <canvas ref={matrixRef} style={{
        position:'fixed',top:0,left:0,zIndex:1,pointerEvents:'none',
        opacity: matrixOn ? 0.5 : 0, transition:'opacity 0.4s ease',
      }} />

      {/* CRT scanlines */}
      <div style={{
        position:'fixed',inset:0,zIndex:2,pointerEvents:'none',
        background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,247,0.012) 2px,rgba(0,255,247,0.012) 4px)',
      }} />

      {/* ── NAV ─────────────────────────────────────── */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:200,
        display:'flex',justifyContent:'space-between',alignItems:'center',
        padding:'14px 40px',
        background:'rgba(10,10,10,0.88)',
        backdropFilter:'blur(14px)',
        borderBottom:'1px solid rgba(0,255,247,0.15)',
      }}>
        <div style={{ fontFamily:'Orbitron',fontWeight:900,fontSize:'1rem',letterSpacing:4 }}>
          <span style={{ color:'#fff' }}>SUGENG</span>
          <span style={{ color:'var(--cyan)' }}>_</span>
          <span style={{ color:'var(--magenta)' }}>TRIANTO</span>
        </div>
        <div style={{ display:'flex',gap:28,alignItems:'center' }}>
          {['about','projects','achievements','contact'].map(s=>(
            <a key={s} href={`#${s}`} style={{
              fontFamily:'JetBrains Mono',color:'#555',textDecoration:'none',
              fontSize:'0.75rem',letterSpacing:2,textTransform:'uppercase',transition:'color 0.2s',
            }}
              onMouseEnter={e=>(e.currentTarget.style.color='var(--cyan)')}
              onMouseLeave={e=>(e.currentTarget.style.color='#555')}>
              {s}
            </a>
          ))}
          <button onClick={()=>setTermOpen(true)} style={{
            fontFamily:'VT323',fontSize:'1.05rem',background:'transparent',
            border:'1px solid #ff00ff44',color:'var(--magenta)',padding:'4px 14px',
            cursor:'pointer',letterSpacing:2,transition:'all 0.2s',
          }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.boxShadow='0 0 12px var(--magenta)'; (e.currentTarget as HTMLElement).style.borderColor='var(--magenta)';}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.boxShadow='none'; (e.currentTarget as HTMLElement).style.borderColor='#ff00ff44';}}>
            [~] TERM
          </button>
        </div>
      </nav>

      <main style={{ position:'relative',zIndex:10 }}>

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section style={{
          minHeight:'100vh',display:'flex',flexDirection:'column',
          justifyContent:'center',alignItems:'center',textAlign:'center',
          padding:'120px 24px 80px',
        }}>
          {/* status bar */}
          <div style={{
            fontFamily:'VT323',fontSize:'1rem',color:'#00ff41',
            letterSpacing:4,marginBottom:28,
            display:'flex',alignItems:'center',gap:12,
          }}>
            <span style={{
              display:'inline-block',width:8,height:8,borderRadius:'50%',
              background:'#00ff41',boxShadow:'0 0 8px #00ff41',
              animation:'blink 1.4s ease-in-out infinite',
            }}/>
            SYSTEM_ONLINE :: PORTFOLIO_LOADED
          </div>

          {/* Main glitch title */}
          <h1 style={{
            fontFamily:'Orbitron',fontWeight:900,
            fontSize:'clamp(1.8rem,5.5vw,4.8rem)',
            letterSpacing:4,lineHeight:1.1,color:'#fff',
            textShadow: glitchOn
              ? '4px 0 #ff00ff,-4px 0 #00fff7,0 3px #ffe600'
              : '0 0 30px rgba(0,255,247,0.3)',
            transition:'text-shadow 0.05s',
            marginBottom:10,
          }}>
            <span className="glitch-wrap" data-text="SUGENG TRIANTO">SUGENG TRIANTO</span>
          </h1>
          <h2 style={{
            fontFamily:'Orbitron',fontWeight:400,
            fontSize:'clamp(0.75rem,2vw,1.2rem)',
            color:'var(--cyan)',letterSpacing:5,marginBottom:32,
          }}>
            // SOFTWARE DEVELOPER
          </h2>

          <p style={{
            maxWidth:600,fontFamily:'JetBrains Mono',color:'#666',
            fontSize:'0.9rem',lineHeight:2,letterSpacing:0.5,marginBottom:44,
          }}>
            Crafting scalable digital realities with{' '}
            <span style={{color:'var(--cyan)'}}>AI</span>,{' '}
            <span style={{color:'var(--magenta)'}}>Blockchain</span>, and{' '}
            <span style={{color:'var(--yellow)'}}>Cybernetic Code</span>.
          </p>

          <div style={{ display:'flex',gap:20,flexWrap:'wrap',justifyContent:'center' }}>
            <a href="#projects" className="cyber-btn">⚡ Enter the System</a>
            <a href="#contact" className="cyber-btn magenta">Establish Link</a>
          </div>

          {/* scroll hint */}
          <div style={{ position:'absolute',bottom:36,left:'50%',transform:'translateX(-50%)',textAlign:'center' }}>
            <div style={{
              width:1,height:50,
              background:'linear-gradient(to bottom,var(--cyan),transparent)',
              margin:'0 auto',animation:'float 2s ease-in-out infinite',
            }}/>
            <div style={{ fontFamily:'VT323',color:'#333',fontSize:'0.85rem',marginTop:8,letterSpacing:3 }}>
              SCROLL_↓
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            ABOUT
        ══════════════════════════════════════════ */}
        <section id="about" style={{ padding:'100px 24px',maxWidth:1100,margin:'0 auto' }}>
          <SectionHead num="01" label="ABOUT ME" color="var(--cyan)" />

          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',
            gap:52,marginTop:64,alignItems:'start',
          }}>

            {/* Hologram portrait + terminal */}
            <div style={{ display:'flex',flexDirection:'column',gap:24 }}>
              {/* Photo */}
              <div className="holo-frame" style={{
                border:'1px solid rgba(0,255,247,0.35)',
                boxShadow:'0 0 30px rgba(0,255,247,0.1)',
                background:'#080812',
                overflow:'hidden',
                maxWidth:320,
              }}>
                <div className="scan-line" />
                {/* Corner accents */}
                {['tl','tr','bl','br'].map(c=>(
                  <div key={c} style={{
                    position:'absolute',
                    ...(c.includes('t')?{top:0}:{bottom:0}),
                    ...(c.includes('l')?{left:0}:{right:0}),
                    width:18,height:18,
                    borderTop: c.includes('t') ? '2px solid var(--cyan)' : 'none',
                    borderBottom: c.includes('b') ? '2px solid var(--cyan)' : 'none',
                    borderLeft: c.includes('l') ? '2px solid var(--cyan)' : 'none',
                    borderRight: c.includes('r') ? '2px solid var(--cyan)' : 'none',
                    zIndex:5,
                  }}/>
                ))}
                {/* Placeholder avatar (no user photo uploaded) */}
                <div style={{
                  width:'100%',aspectRatio:'1',
                  background:'linear-gradient(135deg,#0a0a20,#1a0a2e,#0a1a20)',
                  display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
                  gap:12,position:'relative',
                }}>
                  {/* Hexagon avatar icon */}
                  <div style={{
                    width:80,height:80,
                    background:'rgba(0,255,247,0.08)',
                    border:'2px solid rgba(0,255,247,0.4)',
                    borderRadius:'50%',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    boxShadow:'0 0 20px rgba(0,255,247,0.2)',
                    fontSize:'2rem',
                  }}>
                    <span style={{ color:'var(--cyan)',fontFamily:'Orbitron',fontWeight:900,fontSize:'1.4rem' }}>ST</span>
                  </div>
                  <div style={{ fontFamily:'VT323',color:'var(--cyan)',fontSize:'1.2rem',letterSpacing:4 }}>
                    SUGENG_TRIANTO
                  </div>
                  <div style={{ fontFamily:'JetBrains Mono',color:'#444',fontSize:'0.7rem',letterSpacing:2 }}>
                    FULLSTACK.DEV
                  </div>
                  {/* decorative rings */}
                  <div style={{
                    position:'absolute',inset:20,
                    border:'1px solid rgba(0,255,247,0.06)',borderRadius:'50%',
                    animation:'spin 12s linear infinite',
                  }}/>
                  <div style={{
                    position:'absolute',inset:40,
                    border:'1px solid rgba(255,0,255,0.06)',borderRadius:'50%',
                    animation:'spin 8s linear infinite reverse',
                  }}/>
                </div>
                {/* bottom bar */}
                <div style={{
                  padding:'10px 14px',background:'rgba(0,0,0,0.6)',
                  borderTop:'1px solid rgba(0,255,247,0.15)',
                  display:'flex',justifyContent:'space-between',
                }}>
                  <span style={{ fontFamily:'VT323',color:'#444',fontSize:'0.9rem' }}>HOLO_ID:ST-001</span>
                  <span style={{ fontFamily:'VT323',color:'var(--cyan)',fontSize:'0.9rem' }}>◉ ONLINE</span>
                </div>
              </div>

              {/* Mini terminal */}
              <div style={{
                background:'#080810',border:'1px solid rgba(0,255,247,0.2)',borderRadius:3,overflow:'hidden',
              }}>
                <div style={{
                  background:'rgba(0,255,247,0.06)',padding:'8px 14px',
                  borderBottom:'1px solid rgba(0,255,247,0.12)',
                  display:'flex',gap:8,alignItems:'center',
                }}>
                  {['#ff5f57','#febc2e','#28c840'].map((c,i)=>(
                    <div key={i} style={{width:11,height:11,borderRadius:'50%',background:c}}/>
                  ))}
                  <span style={{ fontFamily:'JetBrains Mono',color:'#333',fontSize:'0.7rem',marginLeft:6 }}>
                    identity.sh
                  </span>
                </div>
                <div style={{ padding:'20px 18px',fontFamily:'VT323',fontSize:'1.15rem',lineHeight:1.9 }}>
                  <div style={{ color:'#444' }}>$ whoami</div>
                  <div style={{ color:'var(--cyan)' }}>Sugeng Trianto</div>
                  <br/>
                  <div style={{ color:'#444' }}>$ cat profile.txt</div>
                  {[
                    ['Role',     'Fullstack Dev & AI Enthusiast'],
                    ['Location', 'Malang, Indonesia'],
                    ['Exp',      '3+ Years'],
                    ['Focus',    'Fullstack · AI · Blockchain'],
                    ['GitHub',   'Elfastsasa1'],
                    ['Twitter',  '@Elfastsasa1'],
                  ].map(([k,v])=>(
                    <div key={k} style={{color:'#e0e0e0'}}>
                      <span style={{color:'var(--magenta)'}}>{k}</span>
                      <span style={{color:'#333'}}> :: </span>
                      <span style={{color:'var(--cyan)'}}>{v}</span>
                    </div>
                  ))}
                  <span style={{
                    display:'inline-block',width:9,height:'1.1em',
                    background:'var(--cyan)',animation:'blink 1s step-end infinite',
                    verticalAlign:'text-bottom',marginLeft:3,
                  }}/>
                </div>
              </div>
            </div>

            {/* Bio + skills */}
            <div>
              <p style={{
                fontFamily:'JetBrains Mono',color:'#666',fontSize:'0.88rem',lineHeight:2.1,marginBottom:36,
              }}>
                A dynamic software developer with{' '}
                <span style={{color:'var(--cyan)'}}>3+ years</span> of experience in fullstack development,
                RESTful APIs, AI-driven solutions, smart contract development, and scalable system architecture.
                Passionate about blending{' '}
                <span style={{color:'var(--magenta)'}}>cutting-edge technology</span> with creativity.
              </p>

              {/* Skill bars */}
              <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
                {[
                  { name:'Next.js / React', pct:92, color:'var(--cyan)' },
                  { name:'Node.js / APIs',  pct:88, color:'var(--magenta)' },
                  { name:'Solidity / Web3', pct:80, color:'var(--yellow)' },
                  { name:'AI Integration', pct:85, color:'var(--cyan)' },
                  { name:'DevOps / CI-CD', pct:75, color:'var(--magenta)' },
                ].map(s=>(
                  <div key={s.name}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                      <span style={{fontFamily:'JetBrains Mono',color:'#555',fontSize:'0.75rem'}}>{s.name}</span>
                      <span style={{fontFamily:'VT323',color:s.color,fontSize:'1rem'}}>{s.pct}%</span>
                    </div>
                    <div style={{background:'rgba(255,255,255,0.04)',height:3,borderRadius:2,overflow:'hidden'}}>
                      <div style={{
                        width:`${s.pct}%`,height:'100%',borderRadius:2,
                        background:`linear-gradient(90deg,${s.color},${s.color}55)`,
                        boxShadow:`0 0 8px ${s.color}`,
                      }}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech badges */}
              <div style={{ marginTop:32,display:'flex',flexWrap:'wrap',gap:10 }}>
                {['TypeScript','Next.js','Node.js','Solidity','OpenAI','Docker','PostgreSQL','Hardhat','React','Tailwind'].map(t=>(
                  <span key={t} style={{
                    fontFamily:'JetBrains Mono',fontSize:'0.7rem',
                    color:'rgba(0,255,247,0.7)',border:'1px solid rgba(0,255,247,0.2)',
                    padding:'3px 10px',borderRadius:2,transition:'all 0.2s',cursor:'default',
                  }}
                    onMouseEnter={e=>{
                      const el=e.currentTarget as HTMLElement;
                      el.style.borderColor='var(--cyan)';
                      el.style.color='var(--cyan)';
                      el.style.boxShadow='0 0 10px rgba(0,255,247,0.2)';
                    }}
                    onMouseLeave={e=>{
                      const el=e.currentTarget as HTMLElement;
                      el.style.borderColor='rgba(0,255,247,0.2)';
                      el.style.color='rgba(0,255,247,0.7)';
                      el.style.boxShadow='none';
                    }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PROJECTS
        ══════════════════════════════════════════ */}
        <section id="projects" style={{
          padding:'100px 24px',background:'rgba(0,0,0,0.45)',
        }}>
          <div style={{ maxWidth:1100,margin:'0 auto' }}>
            <SectionHead num="02" label="PROJECTS & EXPERIENCE" color="var(--magenta)" />
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',
              gap:24,marginTop:60,
            }}>
              {PROJECTS.map(p => <ProjectCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            ACHIEVEMENTS
        ══════════════════════════════════════════ */}
        <section id="achievements" style={{ padding:'100px 24px' }}>
          <div style={{ maxWidth:1100,margin:'0 auto' }}>
            <SectionHead num="03" label="ACHIEVEMENTS" color="var(--yellow)" />

            <div style={{
              display:'flex',justifyContent:'center',marginTop:60,
            }}>
              <div
                onMouseEnter={()=>setCertHover(true)}
                onMouseLeave={()=>setCertHover(false)}
                style={{
                  background:'#080812',
                  border:`1px solid ${certHover?'rgba(255,230,0,0.7)':'rgba(255,230,0,0.25)'}`,
                  borderRadius:4,overflow:'hidden',maxWidth:500,width:'100%',
                  boxShadow: certHover
                    ? '0 0 40px rgba(255,230,0,0.2),0 0 80px rgba(255,0,255,0.1)'
                    : '0 0 20px rgba(255,230,0,0.05)',
                  transition:'all 0.4s ease',
                  transform: certHover ? 'scale(1.02)' : 'scale(1)',
                }}>
                {/* card header */}
                <div style={{
                  background:'linear-gradient(135deg,rgba(255,230,0,0.12),rgba(255,0,255,0.08))',
                  padding:'16px 22px',borderBottom:'1px solid rgba(255,230,0,0.2)',
                  display:'flex',alignItems:'center',gap:14,
                }}>
                  <div style={{
                    width:42,height:42,borderRadius:'50%',background:'#e53935',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontFamily:'Orbitron',color:'#fff',fontWeight:900,fontSize:'0.75rem',
                    flexShrink:0,
                  }}>SE</div>
                  <div>
                    <div style={{fontFamily:'Orbitron',color:'var(--yellow)',fontSize:'0.8rem',letterSpacing:2}}>
                      SUPERCHAIN ECO
                    </div>
                    <div style={{fontFamily:'JetBrains Mono',color:'#444',fontSize:'0.68rem',marginTop:2}}>
                      Certificate of Graduation
                    </div>
                  </div>
                  <div style={{marginLeft:'auto',fontFamily:'VT323',color:certHover?'var(--yellow)':'#444',fontSize:'1.1rem',letterSpacing:2,transition:'color 0.3s'}}>
                    ★ VERIFIED
                  </div>
                </div>

                {/* Certificate image */}
                <div style={{ position:'relative',overflow:'hidden' }}>
                  <img
                    src="/cert.jpg"
                    alt="Optimism Contributor Essentials S6 Certificate — Elfastsasa"
                    style={{
                      width:'100%',display:'block',
                      filter: certHover
                        ? 'brightness(1.05) contrast(1.05)'
                        : 'brightness(0.9) contrast(1) saturate(0.85)',
                      transition:'filter 0.4s',
                    }}
                  />
                  {/* scanline overlay */}
                  <div style={{
                    position:'absolute',inset:0,pointerEvents:'none',
                    background:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,247,0.025) 3px,rgba(0,255,247,0.025) 4px)',
                  }}/>
                  {/* top rainbow line */}
                  <div style={{
                    position:'absolute',top:0,left:0,right:0,height:3,
                    background:'linear-gradient(90deg,var(--yellow),var(--magenta),var(--cyan))',
                    opacity: certHover ? 1 : 0.5,transition:'opacity 0.3s',
                  }}/>
                  {/* glitch overlay on hover */}
                  {certHover && (
                    <div style={{
                      position:'absolute',inset:0,pointerEvents:'none',
                      background:'rgba(0,255,247,0.04)',
                      animation:'glitch1 0.3s steps(1) 2',
                    }}/>
                  )}
                </div>

                {/* footer */}
                <div style={{
                  padding:'16px 22px',display:'flex',justifyContent:'space-between',alignItems:'center',
                  borderTop:'1px solid rgba(255,230,0,0.1)',
                }}>
                  <div>
                    <div style={{fontFamily:'VT323',color:'var(--yellow)',fontSize:'1rem',letterSpacing:2}}>SERIAL_NO</div>
                    <div style={{fontFamily:'JetBrains Mono',color:'#444',fontSize:'0.72rem',marginTop:3}}>cert_9rw7k9qw</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontFamily:'VT323',color:'var(--cyan)',fontSize:'1rem',letterSpacing:2}}>OPTIMISM_S6</div>
                    <div style={{fontFamily:'JetBrains Mono',color:'#444',fontSize:'0.72rem',marginTop:3}}>2024-11-27</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            WALLETS
        ══════════════════════════════════════════ */}
        <section id="wallets" style={{
          padding:'80px 24px',background:'rgba(0,0,0,0.5)',
        }}>
          <div style={{ maxWidth:1100,margin:'0 auto' }}>
            <SectionHead num="04" label="CRYPTO WALLETS" color="var(--cyan)" />
            <div style={{
              display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',
              gap:20,marginTop:50,
            }}>
              {WALLETS.map(w=>(
                <WalletCard key={w.label} w={w} copied={copied} onCopy={copyAddr} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CONTACT
        ══════════════════════════════════════════ */}
        <section id="contact" style={{ padding:'100px 24px' }}>
          <div style={{ maxWidth:960,margin:'0 auto' }}>
            <SectionHead num="05" label="ESTABLISH LINK" color="var(--magenta)" />

            <div style={{
              display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',
              gap:48,marginTop:60,
            }}>
              {/* Links */}
              <div>
                <div style={{fontFamily:'VT323',color:'var(--magenta)',fontSize:'1.3rem',letterSpacing:3,marginBottom:24}}>
                  &gt; CONTACT_NODES
                </div>
                {[
                  { icon:'✉', label:'Email',    val:'elfastsasa8@gmail.com',         href:'mailto:elfastsasa8@gmail.com' },
                  { icon:'⬡', label:'LinkedIn', val:'elfast-sasa-128a80275',          href:'https://id.linkedin.com/in/elfast-sasa-128a80275' },
                  { icon:'◈', label:'Twitter',  val:'@Elfastsasa1',                   href:'https://x.com/Elfastsasa1' },
                  { icon:'◉', label:'GitHub',   val:'Elfastsasa1',                    href:'https://github.com/Elfastsasa1' },
                ].map(item=>(
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
                    style={{
                      display:'flex',alignItems:'center',gap:16,
                      padding:'13px 0',borderBottom:'1px solid rgba(255,0,255,0.08)',
                      textDecoration:'none',transition:'all 0.25s',
                    }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.paddingLeft='10px';}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.paddingLeft='0px';}}>
                    <span style={{color:'var(--magenta)',fontSize:'1.3rem',flexShrink:0}}>{item.icon}</span>
                    <div>
                      <div style={{fontFamily:'VT323',color:'#444',fontSize:'0.9rem',letterSpacing:2}}>{item.label}</div>
                      <div style={{fontFamily:'JetBrains Mono',color:'#888',fontSize:'0.78rem'}}>{item.val}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleForm}>
                <div style={{fontFamily:'VT323',color:'var(--magenta)',fontSize:'1.3rem',letterSpacing:3,marginBottom:24}}>
                  &gt; SEND_TRANSMISSION
                </div>
                {[
                  {id:'name',label:'HANDLE',     type:'text',  key:'name' as const},
                  {id:'email',label:'COMM_LINK',  type:'email', key:'email' as const},
                ].map(f=>(
                  <div key={f.id} style={{marginBottom:16}}>
                    <label style={{fontFamily:'VT323',color:'#444',fontSize:'1rem',display:'block',marginBottom:6,letterSpacing:2}}>
                      {f.label}
                    </label>
                    <input
                      type={f.type} required value={form[f.key]}
                      onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                      style={{
                        width:'100%',background:'#080810',
                        border:'1px solid rgba(255,0,255,0.25)',
                        color:'#e0e0e0',padding:'11px 14px',
                        fontFamily:'JetBrains Mono',fontSize:'0.85rem',
                        outline:'none',borderRadius:2,transition:'border-color 0.2s',
                      }}
                      onFocus={e=>(e.currentTarget.style.borderColor='var(--magenta)')}
                      onBlur={e=>(e.currentTarget.style.borderColor='rgba(255,0,255,0.25)')}
                    />
                  </div>
                ))}
                <div style={{marginBottom:22}}>
                  <label style={{fontFamily:'VT323',color:'#444',fontSize:'1rem',display:'block',marginBottom:6,letterSpacing:2}}>
                    MESSAGE
                  </label>
                  <textarea rows={4} required value={form.msg}
                    onChange={e=>setForm(p=>({...p,msg:e.target.value}))}
                    style={{
                      width:'100%',background:'#080810',
                      border:'1px solid rgba(255,0,255,0.25)',
                      color:'#e0e0e0',padding:'11px 14px',
                      fontFamily:'JetBrains Mono',fontSize:'0.85rem',
                      outline:'none',borderRadius:2,resize:'vertical',transition:'border-color 0.2s',
                    }}
                    onFocus={e=>(e.currentTarget.style.borderColor='var(--magenta)')}
                    onBlur={e=>(e.currentTarget.style.borderColor='rgba(255,0,255,0.25)')}
                  />
                </div>
                <button type="submit" className="cyber-btn magenta" style={{width:'100%'}}>
                  {sent ? '✓ TRANSMISSION SENT' : 'SEND SIGNAL →'}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════ */}
        <footer style={{
          borderTop:'1px solid rgba(0,255,247,0.1)',
          padding:'48px 24px',textAlign:'center',
          background:'rgba(0,0,0,0.7)',
        }}>
          <pre style={{
            fontFamily:'VT323',
            fontSize:'clamp(0.38rem,1.2vw,0.75rem)',
            color:'var(--cyan)',lineHeight:1.2,marginBottom:20,
            textShadow:'0 0 10px var(--cyan)',
            letterSpacing:1,overflowX:'auto',
          }}>{`
 ███████╗██╗   ██╗ ██████╗ ███████╗███╗   ██╗ ██████╗     ████████╗██████╗ ██╗ █████╗ ███╗   ██╗████████╗ ██████╗ 
 ██╔════╝██║   ██║██╔════╝ ██╔════╝████╗  ██║██╔════╝        ██╔══╝██╔══██╗██║██╔══██╗████╗  ██║╚══██╔══╝██╔═══██╗
 ███████╗██║   ██║██║  ███╗█████╗  ██╔██╗ ██║██║  ███╗       ██║   ██████╔╝██║███████║██╔██╗ ██║   ██║   ██║   ██║
 ╚════██║██║   ██║██║   ██║██╔══╝  ██║╚██╗██║██║   ██║       ██║   ██╔══██╗██║██╔══██║██║╚██╗██║   ██║   ██║   ██║
 ███████║╚██████╔╝╚██████╔╝███████╗██║ ╚████║╚██████╔╝       ██║   ██║  ██║██║██║  ██║██║ ╚████║   ██║   ╚██████╔╝
 ╚══════╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝        ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ 
          `}</pre>
          <p style={{fontFamily:'JetBrains Mono',color:'#222',fontSize:'0.72rem',letterSpacing:3}}>
            © 2024 SUGENG TRIANTO · CRAFTED IN THE CYBERVOID
          </p>
          <p style={{fontFamily:'VT323',color:'#333',fontSize:'0.9rem',marginTop:8,letterSpacing:3}}>
            Press <span style={{color:'var(--cyan)'}}>~</span> to open terminal
          </p>
        </footer>
      </main>

      {/* ══════════════════════════════════════════
          TERMINAL OVERLAY
      ══════════════════════════════════════════ */}
      {termOpen && (
        <div
          style={{
            position:'fixed',inset:0,zIndex:999,
            background:'rgba(0,0,0,0.75)',backdropFilter:'blur(6px)',
            display:'flex',alignItems:'flex-end',justifyContent:'center',
          }}
          onClick={()=>setTermOpen(false)}>
          <div
            onClick={e=>e.stopPropagation()}
            style={{
              width:'100%',maxWidth:820,height:'58vh',
              background:'rgba(4,4,14,0.98)',
              border:'1px solid var(--cyan)',borderBottom:'none',
              display:'flex',flexDirection:'column',
              boxShadow:'0 -24px 80px rgba(0,255,247,0.12)',
            }}>
            {/* title bar */}
            <div style={{
              background:'rgba(0,255,247,0.07)',padding:'10px 18px',
              borderBottom:'1px solid rgba(0,255,247,0.2)',
              display:'flex',justifyContent:'space-between',alignItems:'center',
            }}>
              <span style={{fontFamily:'Orbitron',color:'var(--cyan)',fontSize:'0.72rem',letterSpacing:4}}>
                CYBERTERM_v2.0 :: SUGENG_TRIANTO
              </span>
              <div style={{display:'flex',alignItems:'center',gap:16}}>
                <span style={{fontFamily:'VT323',color:'#333',fontSize:'0.9rem'}}>ESC or ~ to close</span>
                <button onClick={()=>setTermOpen(false)} style={{
                  background:'transparent',border:'none',color:'#ff5f57',
                  cursor:'pointer',fontSize:'1.3rem',lineHeight:1,
                }}>×</button>
              </div>
            </div>
            {/* body */}
            <div style={{
              flex:1,overflowY:'auto',padding:'16px 20px',
              fontFamily:'VT323',fontSize:'1.1rem',lineHeight:1.85,
            }}>
              {termLines.map((l,i)=>(
                <div key={i} style={{
                  color: l.t==='cmd' ? 'var(--yellow)' : 'var(--cyan)',
                  whiteSpace:'pre-wrap',
                }}>{l.v}</div>
              ))}
              <div ref={termEndRef}/>
            </div>
            {/* input */}
            <form onSubmit={handleTerm} style={{
              display:'flex',borderTop:'1px solid rgba(0,255,247,0.15)',
              padding:'10px 18px',gap:10,
            }}>
              <span style={{fontFamily:'VT323',color:'var(--magenta)',fontSize:'1.2rem',lineHeight:'28px'}}>$</span>
              <input
                ref={inputRef}
                value={termInput}
                onChange={e=>setTermInput(e.target.value)}
                style={{
                  flex:1,background:'transparent',border:'none',outline:'none',
                  fontFamily:'VT323',fontSize:'1.2rem',color:'#e0e0e0',
                  caretColor:'var(--cyan)',
                }}
                placeholder="type a command…"
                autoComplete="off"
              />
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes scanDown{0%{top:-10%}100%{top:110%}}
        @keyframes glitch1{
          0%,100%{clip-path:inset(0 0 98% 0);transform:translate(-4px,0)}
          20%{clip-path:inset(30% 0 50% 0);transform:translate(4px,0)}
          40%{clip-path:inset(60% 0 20% 0);transform:translate(-2px,0)}
          60%{clip-path:inset(80% 0 5% 0);transform:translate(2px,0)}
          80%{clip-path:inset(10% 0 80% 0);transform:translate(-4px,0)}
        }
        @keyframes glitch2{
          0%,100%{clip-path:inset(0 0 95% 0);transform:translate(4px,0);color:var(--magenta)}
          20%{clip-path:inset(40% 0 40% 0);transform:translate(-4px,0)}
          40%{clip-path:inset(70% 0 10% 0);transform:translate(2px,0)}
          60%{clip-path:inset(20% 0 70% 0);transform:translate(-2px,0)}
          80%{clip-path:inset(50% 0 30% 0);transform:translate(4px,0)}
        }
        @media(max-width:768px){
          nav{padding:12px 16px!important;}
          nav a{display:none;}
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════ */
function SectionHead({ num, label, color }: { num:string; label:string; color:string }) {
  return (
    <div style={{ display:'flex',alignItems:'center',gap:18 }}>
      <span style={{ fontFamily:'VT323',color:'#222',fontSize:'3.5rem',lineHeight:1 }}>{num}</span>
      <div>
        <h2 style={{
          fontFamily:'Orbitron',fontWeight:900,
          fontSize:'clamp(1.1rem,2.8vw,1.7rem)',
          color:'#fff',letterSpacing:4,
          textShadow:`0 0 20px ${color}44`,
        }}>{label}</h2>
        <div style={{
          height:2,marginTop:8,maxWidth:240,
          background:`linear-gradient(90deg,${color},transparent)`,
        }}/>
      </div>
    </div>
  );
}

function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  const [hov, setHov] = useState(false);
  const [glitch, setGlitch] = useState(false);

  return (
    <div
      onMouseEnter={()=>{ setHov(true); setGlitch(true); setTimeout(()=>setGlitch(false),220); }}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:'#090912',
        border:`1px solid ${hov ? p.color : p.color+'33'}`,
        borderRadius:3,padding:'26px',
        transition:'all 0.35s ease',
        boxShadow: hov ? `0 0 28px ${p.color}22,0 8px 32px rgba(0,0,0,0.4)` : 'none',
        transform: hov ? 'translateY(-5px)' : 'none',
        position:'relative',overflow:'hidden',cursor:'default',
      }}>
      {/* corner accent */}
      <div style={{
        position:'absolute',top:0,right:0,
        width:0,height:0,borderStyle:'solid',
        borderWidth:'0 22px 22px 0',
        borderColor:`transparent ${p.color} transparent transparent`,
        opacity: hov ? 1 : 0.3,
        transition:'opacity 0.3s',
      }}/>

      <h3 style={{
        fontFamily:'Orbitron',color:p.color,
        fontSize:'0.88rem',fontWeight:700,letterSpacing:2,marginBottom:8,
        animation: glitch ? 'glitch1 0.15s steps(1) 3' : 'none',
      }}>{p.title}</h3>

      <div style={{fontFamily:'VT323',color:'#444',fontSize:'0.95rem',letterSpacing:1,marginBottom:12}}>
        ROLE :: {p.role}
      </div>

      <p style={{fontFamily:'JetBrains Mono',color:'#666',fontSize:'0.78rem',lineHeight:1.8,marginBottom:18}}>
        {p.desc}
      </p>

      <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:18}}>
        {p.stack.map(s=>(
          <span key={s} style={{
            fontFamily:'JetBrains Mono',color:`${p.color}aa`,
            border:`1px solid ${p.color}33`,
            padding:'2px 8px',fontSize:'0.68rem',borderRadius:2,
          }}>{s}</span>
        ))}
      </div>

      {p.link !== '#' && (
        <a href={p.link} target="_blank" rel="noreferrer" style={{
          fontFamily:'VT323',color:p.color,fontSize:'1rem',
          textDecoration:'none',letterSpacing:2,
          display:'inline-flex',alignItems:'center',gap:6,
          transition:'text-shadow 0.2s',
        }}
          onMouseEnter={e=>(e.currentTarget.style.textShadow=`0 0 12px ${p.color}`)}
          onMouseLeave={e=>(e.currentTarget.style.textShadow='none')}>
          VIEW PROJECT →
        </a>
      )}

      <div style={{
        position:'absolute',bottom:0,left:0,right:0,height:2,
        background:`linear-gradient(90deg,transparent,${p.color},transparent)`,
        opacity: hov ? 1 : 0,transition:'opacity 0.3s',
      }}/>
    </div>
  );
}

function WalletCard({
  w, copied, onCopy,
}: {
  w: typeof WALLETS[0];
  copied: string;
  onCopy: (addr: string, label: string) => void;
}) {
  const [hov, setHov] = useState(false);
  const isCopied = copied === w.label;

  return (
    <div
      onClick={()=>onCopy(w.addr, w.label)}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:'#090912',cursor:'pointer',
        border:`1px solid ${hov ? w.color : w.color+'33'}`,
        borderRadius:3,padding:'20px 22px',
        transition:'all 0.3s',
        boxShadow: hov ? `0 0 24px ${w.color}22` : 'none',
        position:'relative',overflow:'hidden',
      }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <span style={{fontFamily:'Orbitron',color:w.color,fontSize:'0.9rem',fontWeight:700,letterSpacing:3}}>
          {w.label}
        </span>
        <span style={{fontFamily:'VT323',color: isCopied ? '#00ff41' : '#444',fontSize:'1rem',letterSpacing:1,transition:'color 0.2s'}}>
          {isCopied ? '✓ COPIED!' : 'CLICK TO COPY'}
        </span>
      </div>
      <div style={{fontFamily:'JetBrains Mono',color:'#555',fontSize:'0.65rem',wordBreak:'break-all',lineHeight:1.7}}>
        {w.addr}
      </div>
      <div style={{
        position:'absolute',bottom:0,left:0,right:0,height:2,
        background:`linear-gradient(90deg,transparent,${w.color},transparent)`,
        opacity: hov ? 1 : 0.2,transition:'opacity 0.3s',
      }}/>
    </div>
  );
}
