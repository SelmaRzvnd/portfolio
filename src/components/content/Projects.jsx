const projects = [
  {
    emoji: "🧠",
    title: "Noumena",
    tag: "Hackathon · Mar 2026",
    tagColor: "#a78bfa",
    desc: "Speculative neural-capture app with full UX prototyping in Figma. Built an astronomical visual identity and multi-mode thought/dream capture system.",
    stack: ["Figma", "UX Design", "Concept Dev"],
    stackColor: "#a78bfa",
    link: "https://devpost.com/software/noumena",
    linkLabel: "Devpost ↗",
  },
  {
    emoji: "🌐",
    title: "TechLelum",
    tag: "Hackcamp · Nov 2025",
    tagColor: "#60a5fa",
    desc: "Built core React components and designed the initial UI/UX for a youth tech learning platform.",
    stack: ["React", "Figma", "Frontend"],
    stackColor: "#60a5fa",
    link: "https://devpost.com/software/tech-lelum",
    linkLabel: "Devpost ↗",
  },
  {
    emoji: "⭐",
    title: "Binary Star Simulation",
    tag: "Personal · Sep 2025",
    tagColor: "#34d399",
    desc: "Simulated eclipsing binary systems with 3D orbital visualizations and luminosity curves.",
    stack: ["Python", "NumPy", "Astropy"],
    stackColor: "#34d399",
    link: "https://github.com/SelmaRzvnd/eclipsing-binary-sim",
    linkLabel: "GitHub ↗",
  },
  {
    emoji: "🕹️",
    title: "Rogue-like Terminal Game",
    tag: "Personal · 2024",
    tagColor: "#fb923c",
    desc: "C-based rogue-like with procedural generation and turn-based combat.",
    stack: ["C", "ncurses"],
    stackColor: "#fb923c",
    link: "https://github.com/SelmaRzvnd/Rogue",
    linkLabel: "GitHub ↗",
  },
  {
    emoji: "💾",
    title: "File System Command Interpreter",
    tag: "Personal · 2024",
    tagColor: "#f472b6",
    desc: "Terminal-based file system interpreter in C supporting UNIX-like operations.",
    stack: ["C", "UNIX"],
    stackColor: "#f472b6",
    link: "https://github.com/SelmaRzvnd/fs_interpreter",
    linkLabel: "GitHub ↗",
  },
];

export default function Projects() {
  return (
    <div className="space-y-3">
      {projects.map((p) => (
        <div
          key={p.title}
          style={{
            padding: "1rem 1.1rem",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <span style={{ fontSize: "1rem" }}>{p.emoji}</span>
              <h3 style={{ fontWeight: 700, fontSize: "0.92rem", color: "#fff" }}>{p.title}</h3>
              <span style={{
                fontSize: "0.6rem",
                fontFamily: "monospace",
                letterSpacing: "0.08em",
                color: p.tagColor,
                background: `${p.tagColor}18`,
                border: `1px solid ${p.tagColor}35`,
                padding: "0.1rem 0.45rem",
                borderRadius: "3px",
              }}>{p.tag}</span>
            </div>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.7rem",
                fontFamily: "monospace",
                color: "rgba(167,139,250,0.75)",   // soft purple
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "color 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"}   // bright purple
              onMouseLeave={e => e.currentTarget.style.color = "rgba(167,139,250,0.75)"}
            >
              {p.linkLabel}
            </a>
          </div>

          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.55, marginBottom: "0.6rem" }}>
            {p.desc}
          </p>

          {/* Stack pills */}
          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
            {p.stack.map(tag => (
              <span
                key={tag}
                style={{
                  fontSize: "0.65rem",
                  fontFamily: "monospace",
                  letterSpacing: "0.06em",
                  color: p.stackColor,
                  background: `${p.stackColor}12`,
                  border: `1px solid ${p.stackColor}30`,
                  padding: "0.15rem 0.5rem",
                  borderRadius: "3px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}