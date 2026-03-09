import { useState, useEffect, useRef } from "react";

const ASCII_FACES = [
  "(⌐■_■)",
  "ᕙ(⇀‸↼‶)ᕗ",
  "(ノ◕ヮ◕)ノ*:・゚✧",
  "༼ つ ◕_◕ ༽つ",
  "(╯°□°)╯︵ ┻━┻",
  "┬─┬ノ( º _ ºノ)",
  "( ˘ ³˘)♥",
  "ʕ •ᴥ•ʔ",
  "(⊙_◎)",
  "щ(゚Д゚щ)",
];

const HYPE_LINES = [
  "You're literally building the future right now.",
  "Sleep is for people who aren't shipping features.",
  "The best code gets written when the world is quiet.",
  "You + caffeine + 2am = unstoppable force.",
  "Every line you write is a tiny rebellion against mediocrity.",
  "Someone out there WISHES they had your energy rn.",
  "This is your villain origin story (but for productivity).",
  "The commit history doesn't lie — you showed up.",
  "Late night coders built the internet. You're in good company.",
  "Your IDE is literally glowing with pride right now.",
  "Plot twist: you're the main character.",
  "Three words: ship. it. tonight.",
  "You didn't come this far to only come this far.",
  "The bugs fear YOU at this hour.",
  "Somewhere, a rubber duck believes in you.",
  "You're not a night owl. You're a code phoenix.",
  "That function you just wrote? *chef's kiss*",
  "The terminal awaits your commands, legend.",
  "Brain: sleep. You: one more feature. Brain: ...respect.",
  "Fun fact: 73% of legendary repos started after midnight.*\n\n*totally real statistic",
];

const PROJECT_IDEAS = [
  { name: "CLI Fortune Cookie", desc: "A terminal tool that serves absurd motivational quotes with ASCII art. Add cowsay integration for bonus points.", vibe: "🥠" },
  { name: "Git Commit Roaster", desc: "Reads your recent commits and roasts your commit messages using Claude. 'fix stuff' gets what it deserves.", vibe: "🔥" },
  { name: "Procrastination Buster", desc: "A CLI that monitors your active window and plays increasingly dramatic music the longer you're on Reddit.", vibe: "⏰" },
  { name: "Vibe Checker API", desc: "An API endpoint that analyzes any text and returns a vibe score from 'absolute chaos' to 'zen master'.", vibe: "✨" },
  { name: "Code DJ", desc: "Generates lo-fi beat patterns in the terminal based on your code's complexity score. More nested loops = more bass.", vibe: "🎧" },
  { name: "Rage Quit Logger", desc: "Detects when you slam Ctrl+C multiple times and logs your frustration level with timestamps and sympathy.", vibe: "💢" },
  { name: "README Poet", desc: "Takes any boring README and rewrites it as a dramatic epic poem. 'Installation' becomes 'The Summoning Ritual'.", vibe: "📜" },
  { name: "Terminal Tamagotchi", desc: "A pet that lives in your terminal and gets sad if you don't commit code regularly. Feed it with git pushes.", vibe: "🐣" },
];

const COLORS = {
  bg: "#0a0a0f",
  surface: "#12121a",
  surfaceHover: "#1a1a25",
  border: "#2a2a3a",
  primary: "#00ffaa",
  primaryDim: "#00cc88",
  secondary: "#ff6b9d",
  tertiary: "#7c6aff",
  text: "#e0e0e8",
  textDim: "#8888a0",
  glow: "0 0 20px rgba(0, 255, 170, 0.3)",
};

const Particle = ({ delay }) => {
  const size = Math.random() * 3 + 1;
  const left = Math.random() * 100;
  const duration = Math.random() * 8 + 6;
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        background: Math.random() > 0.5 ? COLORS.primary : COLORS.tertiary,
        borderRadius: "50%",
        left: `${left}%`,
        bottom: "-5%",
        opacity: 0,
        animation: `floatUp ${duration}s ${delay}s infinite ease-out`,
      }}
    />
  );
};

export default function LateNightHacker() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [face, setFace] = useState(0);
  const [hypeCount, setHypeCount] = useState(0);
  const [showProject, setShowProject] = useState(null);
  const [glitch, setGlitch] = useState(false);
  const [typing, setTyping] = useState("");
  const [targetText, setTargetText] = useState(HYPE_LINES[0]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [shakeBtn, setShakeBtn] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let i = 0;
    setTyping("");
    const interval = setInterval(() => {
      if (i <= targetText.length) {
        setTyping(targetText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [targetText]);

  const smashHype = () => {
    const next = (currentQuote + 1) % HYPE_LINES.length;
    setCurrentQuote(next);
    setTargetText(HYPE_LINES[next]);
    setFace((f) => (f + 1) % ASCII_FACES.length);
    setHypeCount((h) => h + 1);
    setStreak((s) => {
      const ns = s + 1;
      if (ns > maxStreak) setMaxStreak(ns);
      return ns;
    });
    setGlitch(true);
    setShakeBtn(true);
    setTimeout(() => setGlitch(false), 200);
    setTimeout(() => setShakeBtn(false), 300);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStreak(0), 3000);
  };

  const rollProject = () => {
    const idx = Math.floor(Math.random() * PROJECT_IDEAS.length);
    setShowProject(PROJECT_IDEAS[idx]);
  };

  const hour = new Date().getHours();
  const greeting =
    hour >= 0 && hour < 5
      ? "🌙 deep night mode"
      : hour < 12
      ? "☀️ early bird mode"
      : hour < 17
      ? "⚡ afternoon grind"
      : hour < 21
      ? "🌅 evening session"
      : "🦉 night owl mode";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;800&family=Space+Grotesk:wght@700&family=Outfit:wght@800;900&display=swap');
        
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0; }
          100% { transform: translateY(-100vh) scale(0); opacity: 0; }
        }
        @keyframes pulse { 
          0%, 100% { opacity: 1; } 
          50% { opacity: 0.4; } 
        }
        @keyframes glitchShake {
          0% { transform: translate(0); }
          25% { transform: translate(-3px, 2px); }
          50% { transform: translate(3px, -2px); }
          75% { transform: translate(-2px, -3px); }
          100% { transform: translate(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes smashPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: ${COLORS.primary}33; }
          50% { border-color: ${COLORS.primary}88; }
        }
        @keyframes streakPop {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>

      {/* Particles */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <Particle key={i} delay={i * 0.8} />
        ))}
      </div>

      {/* Scanline overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 640, margin: "0 auto", padding: "40px 20px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: COLORS.textDim, textTransform: "uppercase", marginBottom: 8 }}>
            {greeting}
          </div>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(32px, 7vw, 52px)",
              fontWeight: 900,
              margin: 0,
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.tertiary}, ${COLORS.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
              animation: glitch ? "glitchShake 0.2s ease" : "none",
            }}
          >
            LATE NIGHT
            <br />
            HACKER HQ
          </h1>
          <div style={{ fontSize: 13, color: COLORS.textDim, marginTop: 8 }}>
            you're here. that's already winning.
          </div>
        </div>

        {/* Big ASCII Face */}
        <div
          style={{
            textAlign: "center",
            fontSize: "clamp(28px, 6vw, 44px)",
            margin: "20px 0",
            transition: "all 0.2s",
            filter: glitch ? `hue-rotate(${Math.random() * 360}deg)` : "none",
            textShadow: `0 0 30px ${COLORS.primary}66`,
          }}
        >
          {ASCII_FACES[face]}
        </div>

        {/* Quote Box */}
        <div
          style={{
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: "24px 28px",
            marginBottom: 24,
            minHeight: 90,
            position: "relative",
            animation: "borderGlow 3s infinite",
          }}
        >
          <div style={{ fontSize: 10, letterSpacing: 3, color: COLORS.primaryDim, marginBottom: 12, textTransform: "uppercase" }}>
            /// transmission incoming
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.6, fontWeight: 400, whiteSpace: "pre-wrap" }}>
            {typing}
            <span style={{ animation: "pulse 1s infinite", color: COLORS.primary }}>▊</span>
          </div>
        </div>

        {/* Hype Button + Counter */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 32, flexWrap: "wrap" }}>
          <button
            onClick={smashHype}
            style={{
              flex: 1,
              minWidth: 200,
              padding: "16px 24px",
              background: `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.tertiary}22)`,
              border: `2px solid ${COLORS.primary}`,
              borderRadius: 10,
              color: COLORS.primary,
              fontSize: 15,
              fontWeight: 800,
              fontFamily: "inherit",
              cursor: "pointer",
              letterSpacing: 2,
              textTransform: "uppercase",
              boxShadow: COLORS.glow,
              transition: "all 0.15s",
              animation: shakeBtn ? "smashPulse 0.3s ease" : "none",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${COLORS.primary}44, ${COLORS.tertiary}44)`;
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.tertiary}22)`;
              e.target.style.transform = "translateY(0)";
            }}
          >
            ⚡ HYPE ME UP ⚡
          </button>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: "10px 16px",
                textAlign: "center",
                minWidth: 60,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.secondary }}>{hypeCount}</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: COLORS.textDim }}>HYPES</div>
            </div>
            {streak > 1 && (
              <div
                style={{
                  background: `${COLORS.secondary}22`,
                  border: `1px solid ${COLORS.secondary}66`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  textAlign: "center",
                  animation: "streakPop 0.3s ease",
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.secondary }}>
                  {streak}x
                </div>
                <div style={{ fontSize: 9, letterSpacing: 2, color: COLORS.secondary }}>STREAK</div>
              </div>
            )}
          </div>
        </div>

        {/* Project Idea Generator */}
        <div style={{ marginBottom: 32 }}>
          <button
            onClick={rollProject}
            style={{
              width: "100%",
              padding: "14px 24px",
              background: `linear-gradient(135deg, ${COLORS.tertiary}22, ${COLORS.secondary}22)`,
              border: `1px solid ${COLORS.tertiary}66`,
              borderRadius: 10,
              color: COLORS.tertiary,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
              letterSpacing: 1,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${COLORS.tertiary}44, ${COLORS.secondary}44)`;
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = `linear-gradient(135deg, ${COLORS.tertiary}22, ${COLORS.secondary}22)`;
              e.target.style.transform = "translateY(0)";
            }}
          >
            🎲 Roll a Quirky Claude Code Project
          </button>

          {showProject && (
            <div
              style={{
                marginTop: 12,
                background: COLORS.surface,
                border: `1px solid ${COLORS.tertiary}44`,
                borderRadius: 10,
                padding: "20px 24px",
                animation: "slideUp 0.3s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{showProject.vibe}</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.tertiary }}>{showProject.name}</span>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.textDim }}>{showProject.desc}</div>
              <div
                style={{
                  marginTop: 14,
                  fontSize: 11,
                  color: COLORS.primaryDim,
                  letterSpacing: 1,
                  padding: "6px 10px",
                  background: `${COLORS.primary}11`,
                  borderRadius: 6,
                  display: "inline-block",
                }}
              >
                → "claude, let's build this" and you're off
              </div>
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {[
            { label: "Vibe Level", value: hypeCount < 3 ? "warming up" : hypeCount < 8 ? "locked in" : hypeCount < 15 ? "BEAST MODE" : "TRANSCENDENT", color: COLORS.primary },
            { label: "Best Streak", value: maxStreak > 0 ? `${maxStreak}x combo` : "—", color: COLORS.secondary },
            { label: "Status", value: "shipping", color: COLORS.tertiary },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: "12px 10px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 9, letterSpacing: 2, color: COLORS.textDim, marginBottom: 4, textTransform: "uppercase" }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", fontSize: 11, color: COLORS.textDim, padding: "20px 0" }}>
          built with midnight energy & zero regrets
        </div>
      </div>
    </div>
  );
}
