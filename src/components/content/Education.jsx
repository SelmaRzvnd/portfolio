const certs = [
  { name: "Data Analysis Using Python", org: "IBM", year: "Feb 2026" },
  { name: "Data Fundamentals", org: "IBM SkillsBuild", year: "Feb 2026" },
  { name: "Web Development Fundamentals", org: "IBM SkillsBuild", year: "Feb 2026" },
  { name: "Introduction to Artificial Intelligence", org: "IBM", year: "Sep 2024" },
  { name: "Quantum Technologies Workshop", org: "Sharif Institute of Technology", year: "Mar 2023" },
];

export default function Education() {
  return (
    <div className="space-y-6">

      {/* Degree */}
      <div style={{
        padding: "1.25rem 1.4rem",
        borderRadius: "8px",
        background: "linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,120,60,0.25)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* subtle grid line */}
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, left: 0,
          backgroundImage:
            "linear-gradient(rgba(255,120,60,0.10) 1px, transparent 1px), \
            linear-gradient(90deg, rgba(255,90,40,0.06) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
          pointerEvents: "none",
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
              <span style={{ fontSize: "1.1rem" }}>🎓</span>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#fff" }}>University of British Columbia</h3>
            </div>
            <p style={{ fontSize: "0.82rem", color: "rgba(250, 165, 96, 0.9)", fontStyle: "italic", marginBottom: "0.5rem" }}>
              Combined Honours in Physics &amp; Computer Science
            </p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              padding: "0.25rem 0.7rem",
              background: "rgba(212,175,55,0.12)",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "4px",
            }}>
              <span style={{ fontSize: "0.8rem" }}>✨</span>
              <span style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#d4af37", fontWeight: 700, letterSpacing: "0.05em" }}>
                GPA: 93.4%
              </span>
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <span style={{
              display: "block",
              fontFamily: "monospace",
              fontSize: "0.7rem",
              color: "rgba(250, 147, 96, 0.7)",
              letterSpacing: "0.08em",
            }}>2025 — Present</span>
            <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>Vancouver, BC</span>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h4 style={{
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(212,175,55,0.8)",
          fontFamily: "monospace",
          marginBottom: "0.75rem",
        }}>
          ◈ Certifications
        </h4>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {certs.map((c) => (
            <div
              key={c.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.55rem 0.9rem",
                borderRadius: "5px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0 }}>
                <span style={{ color: "rgba(96,165,250,0.6)", fontSize: "0.7rem", flexShrink: 0 }}>▸</span>
                <div style={{ minWidth: 0 }}>
                  <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.85)", display: "block" }}>{c.name}</span>
                  <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.38)", fontFamily: "monospace" }}>{c.org}</span>
                </div>
              </div>
              <span style={{
                flexShrink: 0,
                fontFamily: "monospace",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.05em",
              }}>{c.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}