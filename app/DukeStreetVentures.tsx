"use client";

import React, { useState, useEffect, useRef } from "react";

interface RevealProps { children: React.ReactNode; delay?: number; y?: number; className?: string; style?: React.CSSProperties; }
interface PhotoProps { variant?: number; style?: React.CSSProperties; className?: string; }
interface HeaderProps { scrollY: number; }

function useReveal(threshold = 0.12): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted, threshold]);
  return [ref, !mounted ? true : visible];
}

function Reveal({ children, delay = 0, y = 40, className = "", style = {} }: RevealProps) {
  const [ref, visible] = useReveal();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: !mounted ? 1 : visible ? 1 : 0,
      transform: !mounted ? "none" : visible ? "translateY(0px)" : `translateY(${y}px)`,
      transition: mounted ? `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s` : "none",
      ...style,
    }}>{children}</div>
  );
}

function IndustrialPhoto({ variant = 0, style = {}, className = "" }: PhotoProps) {
  const idx = variant % 5;
  const id = `p${idx}v${variant}`;
  const photos: React.ReactNode[] = [
    <svg key="0" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}bg`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#181818" /><stop offset="55%" stopColor="#242424" /><stop offset="100%" stopColor="#101010" /></linearGradient>
        <pattern id={`${id}gr`} width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6" /><circle cx="0" cy="0" r="2" fill="rgba(255,255,255,0.06)" /></pattern>
        <linearGradient id={`${id}fd`} x1="0%" y1="80%" x2="0%" y2="100%"><stop offset="0%" stopColor="transparent" /><stop offset="100%" stopColor="rgba(0,0,0,0.7)" /></linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}bg)`} />
      <rect width="100%" height="100%" fill={`url(#${id}gr)`} />
      <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
      <ellipse cx="78%" cy="18%" rx="180" ry="90" fill="rgba(255,255,255,0.04)" transform="rotate(-15 78% 18%)" />
      <rect width="100%" height="100%" fill={`url(#${id}fd)`} />
    </svg>,
    <svg key="1" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}bg`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#131313" /><stop offset="100%" stopColor="#1e1e1e" /></linearGradient>
        <linearGradient id={`${id}fd`} x1="0%" y1="60%" x2="0%" y2="100%"><stop offset="0%" stopColor="transparent" /><stop offset="100%" stopColor="rgba(0,0,0,0.65)" /></linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}bg)`} />
      {[...Array(7)].map((_, i) => <rect key={i} x={`${8 + i * 13}%`} y="0" width={i % 2 === 0 ? "5" : "2"} height="100%" fill={`rgba(255,255,255,${i % 2 === 0 ? 0.04 : 0.02})`} />)}
      <line x1="0" y1="38%" x2="100%" y2="38%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
      <rect width="100%" height="100%" fill={`url(#${id}fd)`} />
    </svg>,
    <svg key="2" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}bg`} x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#1a1a1a" /><stop offset="100%" stopColor="#0c0c0c" /></linearGradient>
        <pattern id={`${id}bk`} width="72" height="36" patternUnits="userSpaceOnUse"><rect width="72" height="36" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="0.5" /><rect x="36" y="18" width="72" height="36" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" /></pattern>
        <linearGradient id={`${id}fd`} x1="0%" y1="70%" x2="0%" y2="100%"><stop offset="0%" stopColor="transparent" /><stop offset="100%" stopColor="rgba(0,0,0,0.6)" /></linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}bg)`} />
      <rect width="100%" height="100%" fill={`url(#${id}bk)`} />
      <ellipse cx="80%" cy="25%" rx="200" ry="70" fill="rgba(255,255,255,0.03)" transform="rotate(10 80% 25%)" />
      <rect width="100%" height="100%" fill={`url(#${id}fd)`} />
    </svg>,
    <svg key="3" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        <radialGradient id={`${id}bg`} cx="40%" cy="40%" r="70%"><stop offset="0%" stopColor="#252525" /><stop offset="100%" stopColor="#0a0a0a" /></radialGradient>
        <linearGradient id={`${id}fd`} x1="0%" y1="65%" x2="0%" y2="100%"><stop offset="0%" stopColor="transparent" /><stop offset="100%" stopColor="rgba(0,0,0,0.75)" /></linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}bg)`} />
      {[...Array(5)].map((_, i) => <ellipse key={i} cx="40%" cy="40%" rx={60 + i * 60} ry={40 + i * 40} fill="none" stroke={`rgba(255,255,255,${0.05 - i * 0.007})`} strokeWidth="0.7" />)}
      {[0, 45, 90, 135].map((a) => <line key={a} x1="40%" y1="40%" x2={`${40 + Math.cos((a * Math.PI) / 180) * 80}%`} y2={`${40 + Math.sin((a * Math.PI) / 180) * 80}%`} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />)}
      <rect width="100%" height="100%" fill={`url(#${id}fd)`} />
    </svg>,
    <svg key="4" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}bg`} x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#0e0e0e" /><stop offset="60%" stopColor="#1c1c1c" /><stop offset="100%" stopColor="#0a0a0a" /></linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}bg)`} />
      <line x1="0" y1="60%" x2="100%" y2="60%" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      {([[5,30,8,30],[14,20,6,40],[21,35,10,25],[32,15,12,45],[45,28,7,32],[53,10,9,50],[63,22,11,38],[75,32,6,28],[82,18,8,42],[91,38,7,22]] as number[][]).map(([x,h,w,y],i) => <rect key={i} x={`${x}%`} y={`${y}%`} width={`${w}%`} height={`${h}%`} fill="rgba(0,0,0,0.5)" />)}
      <rect x="0" y="50%" width="100%" height="50%" fill="rgba(0,0,0,0.4)" />
      <ellipse cx="50%" cy="58%" rx="300" ry="20" fill="rgba(255,255,255,0.015)" />
    </svg>,
  ];
  return (
    <div className={className} style={{ position: "relative", overflow: "hidden", backgroundColor: "#111", ...style }}>
      {photos[idx]}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px", opacity: 0.4, mixBlendMode: "overlay" as const, pointerEvents: "none" as const }} />
    </div>
  );
}

function Header({ scrollY }: HeaderProps) {
  const pinned = scrollY > 60;
  const links: [string, string][] = [["Philosophy","#philosophy"],["What We Invest In","#focus"],["Track Record","#track"],["Approach","#approach"],["Investor Relations","#investors"]];
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "background 0.4s ease", background: pinned ? "rgba(10,10,10,0.92)" : "transparent", backdropFilter: pinned ? "blur(12px)" : "none", borderBottom: pinned ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 40px", height: pinned ? 68 : 88, display: "flex", alignItems: "center", justifyContent: "space-between", transition: "height 0.4s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.05em", color: "#fff" }}>DS</div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 16, fontWeight: 600, letterSpacing: "0.18em", color: "#fff", lineHeight: 1 }}>DUKE STREET</div>
            <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 10, letterSpacing: "0.32em", color: "rgba(255,255,255,0.45)", marginTop: 2 }}>VENTURES</div>
          </div>
        </div>
        <nav className="dsv-nav" style={{ display: "flex", gap: 36 }}>
          {links.map(([label, href]) => (
            <a key={label} href={href} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)", textDecoration: "none", textTransform: "uppercase" as const, transition: "color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"; }}
            >{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}

const T = { serif: "'Cormorant Garamond',Georgia,serif", sans: "'DM Sans',sans-serif", mono: "'DM Mono',monospace", cream: "#F5F2EC", ink: "#0E0E0E", mid: "#6B6B6B", border: "rgba(0,0,0,0.1)" };

function Rule() {
  return <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.2)", margin: "40px 0" }} />;
}

function DarkRule() {
  return <div style={{ width: 48, height: 1, background: "rgba(0,0,0,0.15)", margin: "40px 0" }} />;
}

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.28em", color: light ? "rgba(245,242,236,0.35)" : T.mid, textTransform: "uppercase", marginBottom: 24 }}>{children}</div>;
}

export default function DukeStreetVentures() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fi = (d: number): React.CSSProperties => !mounted ? {} : ({
    animation: `fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s both`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @media(max-width:900px){ .dsv-nav { display: none !important; } .tc { grid-template-columns: 1fr !important; } .g3 { grid-template-columns: 1fr 1fr !important; } .g2 { grid-template-columns: 1fr !important; } }
        @media(max-width:600px){ .g3 { grid-template-columns: 1fr !important; } }
      `}</style>

      <Header scrollY={scrollY} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>
        <IndustrialPhoto variant={4} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(14,14,14,0.25) 0%,rgba(14,14,14,0.1) 40%,rgba(14,14,14,0.92) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "0 40px 110px", width: "100%" }}>
          <div style={fi(0.05)}>
            <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.22em", color: "rgba(245,242,236,0.4)", marginBottom: 40, textTransform: "uppercase" }}>Greenwich, Connecticut</div>
          </div>
          <h1 style={{ fontFamily: T.serif, fontSize: "clamp(52px,7vw,104px)", fontWeight: 300, lineHeight: 1.06, color: T.cream, maxWidth: 860, letterSpacing: "-0.015em", ...fi(0.2) }}>
            Traditional&nbsp;Investment<br /><em style={{ fontStyle: "italic" }}>Structures.</em><br />Advanced&nbsp;Technology<br /><em style={{ fontStyle: "italic" }}>Platforms.</em>
          </h1>
          <div style={{ ...fi(0.4), maxWidth: 600, marginTop: 40 }}>
            <p style={{ fontFamily: T.sans, fontSize: 17, lineHeight: 1.8, color: "rgba(245,242,236,0.65)" }}>
              A private investment partnership applying time-tested capital discipline to next-generation technology — including artificial intelligence, robotics, drone systems, high-value equipment, and digital infrastructure platforms.
            </p>
            <p style={{ fontFamily: T.serif, fontSize: 20, fontStyle: "italic", color: "rgba(245,242,236,0.5)", marginTop: 24, lineHeight: 1.6 }}>
              We invest in technology not as speculation, but as structured enterprise.
            </p>
          </div>
          <div style={{ ...fi(0.55), display: "flex", gap: 20, marginTop: 52, flexWrap: "wrap" }}>
            <a href="#investors" style={{ display: "inline-block", padding: "14px 36px", border: "1px solid rgba(245,242,236,0.65)", fontFamily: T.sans, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: T.cream, textDecoration: "none", transition: "background 0.3s,color 0.3s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = T.cream; el.style.color = T.ink; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = T.cream; }}
            >Investor Relations</a>
            <a href="#philosophy" style={{ display: "inline-block", padding: "14px 36px", fontFamily: T.sans, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(245,242,236,0.45)", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = T.cream; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,242,236,0.45)"; }}
            >Our Philosophy →</a>
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, right: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.35 }}>
          <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.2em", color: T.cream, writingMode: "vertical-rl" }}>SCROLL</div>
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom,${T.cream},transparent)` }} />
        </div>
      </section>

      {/* ── MANDATE STRIP ──────────────────────────────────────────────────── */}
      <section style={{ background: T.ink, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "60px 40px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,0.06)" }} className="g2">
          {[
            { n: "01", text: "Identify scalable innovation." },
            { n: "02", text: "Structure it responsibly." },
            { n: "03", text: "Build it for institutional durability." },
          ].map((item) => (
            <div key={item.n} style={{ background: T.ink, padding: "40px 48px", display: "flex", gap: 24, alignItems: "flex-start" }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: "rgba(245,242,236,0.2)", letterSpacing: "0.15em", paddingTop: 4, flexShrink: 0 }}>{item.n}</div>
              <div style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 300, color: T.cream, lineHeight: 1.4, fontStyle: "italic" }}>{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ─────────────────────────────────────────────────────── */}
      <section id="philosophy" style={{ background: T.cream }}>
        <div className="tc" style={{ maxWidth: 1320, margin: "0 auto", padding: "120px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
          <div>
            <Reveal>
              <Label>Our Philosophy</Label>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(38px,4vw,64px)", fontWeight: 300, lineHeight: 1.1, color: T.ink, letterSpacing: "-0.01em" }}>
                Technology evolves rapidly.<br /><em style={{ fontStyle: "italic" }}>Capital discipline should not.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <DarkRule />
              <p style={{ fontFamily: T.sans, fontSize: 16, lineHeight: 1.85, color: "#3a3a3a", marginBottom: 24 }}>
                Duke Street Ventures combines conventional investment principles — structured equity, governance integrity, defined liquidity pathways, and asset-backed frameworks — with exposure to frontier technologies shaping the next industrial era.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 16, lineHeight: 1.85, color: "#3a3a3a" }}>
                We believe the future of technology will not be purely digital.
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.15}>
              <IndustrialPhoto variant={2} style={{ width: "100%", aspectRatio: "3/4", marginBottom: 48 }} />
            </Reveal>
            <Reveal delay={0.25}>
              {[
                { label: "It will be physical.", sub: "AI will power machines." },
                { label: "Software will control hardware.", sub: "Automation will move into the real world." },
                { label: "Our role is to finance that transition.", sub: "Responsibly." },
              ].map((item, i) => (
                <div key={i} style={{ padding: "22px 0", borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 400, color: T.ink, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 13, color: T.mid }}>{item.sub}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHAT WE INVEST IN ──────────────────────────────────────────────── */}
      <section id="focus" style={{ background: T.ink, position: "relative", overflow: "hidden" }}>
        <IndustrialPhoto variant={0} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(14,14,14,0.8)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "120px 40px" }}>
          <Reveal>
            <Label light>What We Invest In</Label>
            <h2 style={{ fontFamily: T.serif, fontSize: "clamp(36px,4vw,60px)", fontWeight: 300, color: T.cream, marginBottom: 24, maxWidth: 640, lineHeight: 1.1 }}>
              Platforms that combine innovation with measurable asset value.
            </h2>
            <p style={{ fontFamily: T.sans, fontSize: 16, color: "rgba(245,242,236,0.5)", marginBottom: 80, maxWidth: 560, lineHeight: 1.8 }}>
              We focus on technology platforms with scalable infrastructure characteristics and defensible asset foundations.
            </p>
          </Reveal>
          <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,0.05)" }}>
            {([
              { n: "01", photo: 0, title: "Artificial Intelligence Infrastructure", body: "Enterprise-grade AI systems, decision engines, and applied automation software." },
              { n: "02", photo: 1, title: "Robotics & Autonomous Systems", body: "Industrial robots, commercial automation platforms, and AI-controlled hardware systems." },
              { n: "03", photo: 3, title: "Drone Technology", body: "Advanced aerial systems for logistics, inspection, surveillance, and commercial applications." },
              { n: "04", photo: 2, title: "High-Value Equipment Platforms", body: "Asset-backed technology deployments including precision manufacturing systems, AI-powered machinery, and advanced industrial equipment." },
              { n: "05", photo: 1, title: "Structured Technology Holdings", body: "IP consolidation vehicles and holding companies integrating software and hardware innovation." },
              { n: "06", photo: 3, title: "Digital & Blockchain Infrastructure", body: "Scalable ledger systems supporting asset tracking, supply chains, and digital asset frameworks." },
            ] as const).map((item, i) => (
              <Reveal key={item.n} delay={i * 0.06}>
                <div style={{ background: T.ink, padding: "0", display: "flex", flexDirection: "column", height: "100%", transition: "background 0.3s", cursor: "default" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#161616"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = T.ink; }}
                >
                  <IndustrialPhoto variant={item.photo + i} style={{ width: "100%", aspectRatio: "16/9" }} />
                  <div style={{ padding: "32px 36px 40px", flex: 1 }}>
                    <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", color: "rgba(245,242,236,0.25)", marginBottom: 16 }}>{item.n}</div>
                    <h3 style={{ fontFamily: T.serif, fontSize: 21, fontWeight: 400, lineHeight: 1.25, color: T.cream, marginBottom: 14 }}>{item.title}</h3>
                    <p style={{ fontFamily: T.sans, fontSize: 14, lineHeight: 1.75, color: "rgba(245,242,236,0.45)" }}>{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACK RECORD ───────────────────────────────────────────────────── */}
      <section id="track" style={{ background: T.cream }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "120px 40px" }}>
          <Reveal>
            <Label>Track Record</Label>
            <h2 style={{ fontFamily: T.serif, fontSize: "clamp(36px,4vw,60px)", fontWeight: 300, lineHeight: 1.1, color: T.ink, marginBottom: 20, maxWidth: 680 }}>
              Structured Technology Investments
            </h2>
            <p style={{ fontFamily: T.sans, fontSize: 16, lineHeight: 1.8, color: T.mid, marginBottom: 72, maxWidth: 600 }}>
              Duke Street Ventures has participated in the founding, capitalization, and structuring of multiple technology platforms across software and digital infrastructure.
            </p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {([
              { name: "Magnus AI", year: "2021", role: "Founding Capital Partner", desc: "Founding capital partner and structural architect of AI decision infrastructure." },
              { name: "NB Tech Acquisitions", year: "2020", role: "IP Consolidation Platform", desc: "Consolidated code-based IP across AI and advanced technologies; achieved Nasdaq public market exit via Night Owl merger." },
              { name: "Night Owl Merger", year: "2021", role: "Strategic Transaction", desc: "Strategic public market transaction enabling institutional liquidity." },
              { name: "Fundraising.com", year: "2022", role: "Capital Markets Architecture", desc: "Structured OTC Markets listing creating digital capital access infrastructure." },
              { name: "Newport ECOM Brands", year: "2022", role: "Commerce Platform", desc: "Scalable commerce platform development and capitalization." },
              { name: "DX Chain Assets", year: "2023", role: "Blockchain Infrastructure", desc: "Blockchain infrastructure initiative for digital asset and supply chain frameworks." },
              { name: "Aurma & Supli", year: "2023", role: "Early-Stage Ecosystem", desc: "Early-stage funding through Magnus AI ecosystem — AI trading and commerce intelligence platforms." },
            ] as const).map((item, i) => (
              <Reveal key={item.name} delay={i * 0.07}>
                <div style={{ display: "grid", gridTemplateColumns: "100px 200px 1fr", gap: "0 48px", padding: "36px 0", borderBottom: `1px solid ${T.border}`, alignItems: "start", transition: "padding-left 0.35s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = "20px"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = "0"; }}
                >
                  <div style={{ fontFamily: T.mono, fontSize: 11, color: "rgba(0,0,0,0.25)", letterSpacing: "0.1em", paddingTop: 4 }}>{item.year}</div>
                  <div>
                    <div style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 400, color: T.ink, marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.14em", color: T.mid, textTransform: "uppercase" }}>{item.role}</div>
                  </div>
                  <p style={{ fontFamily: T.sans, fontSize: 14, color: "#5a5a5a", lineHeight: 1.75, maxWidth: 520 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: T.serif, fontSize: 18, fontStyle: "italic", color: T.mid, marginTop: 56, lineHeight: 1.7 }}>
              Our forward mandate expands further into physical AI applications, robotics, and equipment-backed platforms.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── INVESTMENT APPROACH ─────────────────────────────────────────────── */}
      <section id="approach" style={{ background: T.ink, position: "relative", overflow: "hidden" }}>
        <IndustrialPhoto variant={1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(14,14,14,0.96) 0%,rgba(14,14,14,0.7) 100%)" }} />
        <div className="tc" style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "120px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
          <div>
            <Reveal>
              <Label light>Investment Approach</Label>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(36px,4vw,60px)", fontWeight: 300, color: T.cream, lineHeight: 1.1, marginBottom: 32 }}>
                We structure innovation using traditional frameworks.
              </h2>
              <p style={{ fontFamily: T.serif, fontSize: 20, fontStyle: "italic", color: "rgba(245,242,236,0.45)", lineHeight: 1.7 }}>
                We do not pursue rapid, undisciplined growth.<br />We pursue structured scale.
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.15}>
              {[
                "Structured equity participation",
                "Clear governance models",
                "Asset-backed capitalization",
                "Defined liquidity pathways",
                "Institutional accounting discipline",
                "Public-market readiness where appropriate",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ width: 6, height: 6, border: "1px solid rgba(245,242,236,0.3)", flexShrink: 0 }} />
                  <span style={{ fontFamily: T.sans, fontSize: 15, color: "rgba(245,242,236,0.7)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY HARDWARE ───────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "120px 40px" }}>
          <Reveal>
            <Label>Why Hardware Matters</Label>
            <h2 style={{ fontFamily: T.serif, fontSize: "clamp(36px,4vw,60px)", fontWeight: 300, lineHeight: 1.1, color: T.ink, marginBottom: 32, maxWidth: 720 }}>
              Software alone does not define<br /><em style={{ fontStyle: "italic" }}>the next industrial cycle.</em>
            </h2>
          </Reveal>
          <div className="tc" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start", marginTop: 64 }}>
            <div>
              <Reveal delay={0.1}>
                <p style={{ fontFamily: T.sans, fontSize: 16, lineHeight: 1.85, color: "#3a3a3a", marginBottom: 32 }}>
                  Duke Street Ventures recognizes that robotics, drones, and intelligent equipment represent the convergence of digital intelligence and real-world assets.
                </p>
                {[
                  "AI must operate machines.",
                  "Automation must control equipment.",
                  "Data must direct physical systems.",
                ].map((line, i) => (
                  <div key={i} style={{ fontFamily: T.serif, fontSize: 20, fontStyle: "italic", color: T.ink, padding: "16px 0", borderBottom: `1px solid ${T.border}`, lineHeight: 1.4 }}>{line}</div>
                ))}
              </Reveal>
            </div>
            <div>
              <Reveal delay={0.2}>
                <IndustrialPhoto variant={3} style={{ width: "100%", aspectRatio: "4/3", marginBottom: 48 }} />
                <p style={{ fontFamily: T.sans, fontSize: 14, color: T.mid, lineHeight: 1.8, marginBottom: 24 }}>These platforms often carry:</p>
                {[
                  "Tangible collateral value",
                  "Infrastructure characteristics",
                  "Recurring deployment models",
                  "Industrial-scale adoption potential",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ width: 5, height: 5, background: T.ink, flexShrink: 0 }} />
                    <span style={{ fontFamily: T.sans, fontSize: 14, color: "#3a3a3a" }}>{item}</span>
                  </div>
                ))}
                <p style={{ fontFamily: T.serif, fontSize: 17, fontStyle: "italic", color: T.mid, marginTop: 32, lineHeight: 1.7 }}>This aligns naturally with traditional investment discipline.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── RISK MANAGEMENT ────────────────────────────────────────────────── */}
      <section style={{ background: T.cream, borderTop: `1px solid ${T.border}` }}>
        <div className="tc" style={{ maxWidth: 1320, margin: "0 auto", padding: "100px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }}>
          <Reveal>
            <Label>Risk Management Framework</Label>
            <h2 style={{ fontFamily: T.serif, fontSize: "clamp(32px,3.5vw,52px)", fontWeight: 300, lineHeight: 1.15, color: T.ink, marginBottom: 32 }}>
              Technology risk is mitigated through structure.
            </h2>
            <p style={{ fontFamily: T.serif, fontSize: 20, fontStyle: "italic", color: T.mid, lineHeight: 1.7 }}>Structure is our advantage.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              {[
                { label: "Capital Structure Integrity", sub: "Governance-first approach to every investment." },
                { label: "Asset Defensibility", sub: "Real asset backing wherever structurally possible." },
                { label: "Regulatory Positioning", sub: "Compliant frameworks from day one." },
                { label: "Revenue Durability", sub: "Recurring, defensible revenue streams." },
                { label: "Exit Optionality", sub: "Defined liquidity pathways built into structure." },
              ].map((item, i) => (
                <div key={i} style={{ padding: "24px 0", borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.ink, marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 13, color: T.mid, lineHeight: 1.6 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INVESTOR PROFILE ───────────────────────────────────────────────── */}
      <section id="investors" style={{ background: T.ink, position: "relative", overflow: "hidden" }}>
        <IndustrialPhoto variant={2} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.2 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(14,14,14,0.85)" }} />
        <div className="tc" style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "120px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
          <div>
            <Reveal>
              <Label light>Investor Profile</Label>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(36px,4vw,58px)", fontWeight: 300, color: T.cream, lineHeight: 1.1, marginBottom: 32 }}>
                Qualified investors seeking structured technology exposure.
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 16, lineHeight: 1.8, color: "rgba(245,242,236,0.55)", marginBottom: 40 }}>
                We partner with qualified investors seeking exposure to advanced technology platforms without abandoning conservative capital frameworks.
              </p>
              <a href="mailto:investors@dukestreetventures.com" style={{ display: "inline-block", padding: "14px 36px", border: "1px solid rgba(245,242,236,0.5)", fontFamily: T.sans, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: T.cream, textDecoration: "none", transition: "background 0.3s,color 0.3s" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = T.cream; el.style.color = T.ink; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = T.cream; }}
              >Request Information</a>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.15}>
              <div style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(245,242,236,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>Our investors value:</div>
              {[
                "Governance",
                "Measured scaling",
                "Institutional structuring",
                "Strategic liquidity pathways",
                "Real-asset integration with technology",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 20, alignItems: "center", padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ width: 6, height: 6, border: "1px solid rgba(245,242,236,0.25)", flexShrink: 0 }} />
                  <span style={{ fontFamily: T.sans, fontSize: 15, color: "rgba(245,242,236,0.65)" }}>{item}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── LONG-TERM MANDATE / CONTACT ─────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <IndustrialPhoto variant={4} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(14,14,14,0.88) 0%,rgba(14,14,14,0.75) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "120px 40px", textAlign: "center" }}>
          <Reveal>
            <Label light>Long-Term Mandate</Label>
            <h2 style={{ fontFamily: T.serif, fontSize: "clamp(40px,5.5vw,82px)", fontWeight: 300, lineHeight: 1.08, color: T.cream, marginBottom: 40, letterSpacing: "-0.015em", maxWidth: 900, margin: "0 auto 40px" }}>
              Building a portfolio for the next industrial decade.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: "flex", justifyContent: "center", gap: 80, marginBottom: 72, flexWrap: "wrap" }}>
              {["The future will be intelligent.", "It will also be physical.", "We invest in both."].map((line, i) => (
                <div key={i} style={{ fontFamily: T.serif, fontSize: 20, fontStyle: "italic", color: "rgba(245,242,236,0.5)", lineHeight: 1.5 }}>{line}</div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ borderTop: "1px solid rgba(245,242,236,0.12)", paddingTop: 64 }}>
              <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.25em", color: "rgba(245,242,236,0.3)", textTransform: "uppercase", marginBottom: 24 }}>Investor Relations</div>
              <a href="mailto:investors@dukestreetventures.com" style={{ display: "inline-block", fontFamily: T.mono, fontSize: 18, letterSpacing: "0.08em", color: T.cream, textDecoration: "none", borderBottom: "1px solid rgba(245,242,236,0.3)", paddingBottom: 6, transition: "border-color 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,242,236,0.3)"; }}
              >investors@dukestreetventures.com</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#060606", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "60px 40px" }}>
        <div className="tc" style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <div>
            <div style={{ fontFamily: T.serif, fontSize: 13, letterSpacing: "0.28em", color: "rgba(245,242,236,0.5)", marginBottom: 10 }}>DUKE STREET VENTURES</div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: "rgba(245,242,236,0.2)", letterSpacing: "0.1em" }}>Greenwich, Connecticut</div>
          </div>
          <div>
            <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.2em", color: "rgba(245,242,236,0.2)", textTransform: "uppercase", marginBottom: 14 }}>Legal Notice</div>
            <p style={{ fontFamily: T.sans, fontSize: 12, lineHeight: 1.8, color: "rgba(245,242,236,0.18)" }}>
              Duke Street Ventures is a private investment partnership. Investments involve risk and are available only to qualified investors under applicable securities regulations. Past performance is not indicative of future results.
            </p>
          </div>
        </div>
        <div style={{ maxWidth: 1320, margin: "40px auto 0", paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", fontFamily: T.mono, fontSize: 10, letterSpacing: "0.15em", color: "rgba(245,242,236,0.12)" }}>
          <span>© {new Date().getFullYear()} Duke Street Ventures. All rights reserved.</span>
          <span>investors@dukestreetventures.com</span>
        </div>
      </footer>
    </>
  );
}
