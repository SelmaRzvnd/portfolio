const studies = [
  {
    emoji: "🕳️",
    title: "Black Hole Trajectory Simulations",
    org: "UBC Undergraduate Research Opportunities (REX Program)",
    period: "Oct 2025 — Mar 2026",
    location: "Vancouver, BC",
    desc: "Built a Julia framework to simulate particle trajectories around Schwarzschild black holes — geodesic solver, phase-space classification across 160,000 parameter combinations, and 3D orbital visualizations. Presented findings at MURC.",
    tags: ["Julia", "General Relativity", "3D Visualization"],
    color: "#a78bfa",
    supervisor: "Haozhi Hong",
  },
  {
    emoji: "🌌",
    title: "Galaxy Merger Classification",
    org: "IASBS × Caltech",
    period: "Nov 2024 — Present",
    location: "Remote / Collaborative",
    desc: "Developed a CNN to classify galaxy mergers using simulated NIRCam/F277W images from IllustrisTNG100-1 and the Santa Cruz SAM. Applied model to COSMOS-Web survey data and manually validated hundreds of predictions.",
    tags: ["Python", "Machine Learning", "Astrophysics"],
    color: "#60a5fa",
    supervisor: "Dr. Hosein Haghi (IASBS) & Dr. Nima Chartab (Caltech)",
  },
  {
    emoji: "🔭",
    title: "Cold Dust Emission Analysis",
    org: "Institute for Research in Fundamental Sciences (IPM)",
    period: "Nov 2024 — Present",
    location: "Tehran, Iran",
    desc: "Analyzed millimeter-wavelength observations from the NIKA2 camera on the IRAM 30m telescope. Constructed SED models to study correlations between dust properties and star formation rates.",
    tags: ["Python", "DS9", "SED Modelling"],
    color: "#34d399",
    supervisor: "Dr. Golshan Ejlali (IPM)",
  },
];

export default function Research() {
  return (
    <div className="space-y-4">
      {studies.map((s) => (
        <div
          key={s.title}
          style={{
            padding: "1.1rem 1.2rem",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderTop: `2px solid ${s.color}`,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.055)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
        >
          {/* Title row */}
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.25rem" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.93rem", color: "#fff", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>{s.emoji}</span> {s.title}
            </h3>
            <span style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              color: s.color,
              letterSpacing: "0.07em",
              opacity: 0.85,
              flexShrink: 0,
            }}>{s.period}</span>
          </div>

          {/* Org + location */}
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.55rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.72rem", color: s.color, fontFamily: "monospace", letterSpacing: "0.05em", opacity: 0.85 }}>
              {s.org}
            </span>
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>· {s.location}</span>
          </div>

          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "0.65rem" }}>
            {s.desc}
          </p>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            {/* Tags */}
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
              {s.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.63rem",
                    fontFamily: "monospace",
                    letterSpacing: "0.06em",
                    color: s.color,
                    background: `${s.color}12`,
                    border: `1px solid ${s.color}30`,
                    padding: "0.15rem 0.5rem",
                    borderRadius: "3px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Supervisor */}
            <span style={{ fontSize: "0.67rem", color: "rgba(255,255,255,0.3)", fontStyle: "italic", fontFamily: "monospace" }}>
              ↳ {s.supervisor}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}