const awards = [
  {
    icon: "🔬",
    title: "Erich Vogt First Year Summer Research Experience (FYSRE)",
    subtitle: "University of British Columbia",
    year: "Summer 2026",
    desc: "Competitive research program providing first-year students hands-on experience in physics & astronomy.",
    accent: "#a78bfa",
  },
  {
    icon: "🌎",
    title: "Outstanding International Student Award",
    subtitle: "University of British Columbia",
    year: "Sep 2025",
    desc: "Merit-based entrance scholarship for exceptional academic achievement and leadership potential.",
    accent: "#60a5fa",
  },
  {
    icon: "🥇",
    title: "Gold Medal — 19th National Astronomy & Astrophysics Olympiad",
    subtitle: "Young Scholars Club, Tehran, Iran",
    year: "Sep 2023",
    accent: "#d4af37",
  },
  {
    icon: "🥉",
    title: "Bronze Medal — 18th National Astronomy & Astrophysics Olympiad",
    subtitle: "Young Scholars Club, Tehran, Iran",
    year: "Sep 2022",
    accent: "#fb923c",
  },
];

export default function Awards() {
  return (
    <div className="space-y-3">
      {awards.map((a) => (
        <div
          key={a.title}
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "flex-start",
            padding: "1rem 1.1rem",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderLeft: `3px solid ${a.accent}`,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
          }
        >
          <span
            style={{
              fontSize: "1.5rem",
              lineHeight: 1,
              marginTop: "0.1rem",
              flexShrink: 0,
            }}
          >
            {a.icon}
          </span>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Title + Year */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  color: "#fff",
                  lineHeight: 1.3,
                }}
              >
                {a.title}
              </h3>

              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.07em",
                  textAlign: "right",
                }}
              >
                {a.year}
              </span>
            </div>

            <p
              style={{
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "monospace",
                letterSpacing: "0.05em",
                margin: "0.2rem 0 0.35rem",
              }}
            >
              {a.subtitle}
            </p>

            {a.desc && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.5,
                }}
              >
                {a.desc}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
