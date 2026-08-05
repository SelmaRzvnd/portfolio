"use client";

const awards = [
  {
    icon: "🔬",
    title: "Erich Vogt First Year Summer Research Experience (FYSRE)",
    subtitle: "University of British Columbia",
    year: "Summer 2026",
    desc: "Competitive research program providing first-year students hands-on experience in physics & astronomy.",
    accent: "#56e694",
  },
  {
    icon: "🌎",
    title: "Outstanding International Student Award",
    subtitle: "University of British Columbia",
    year: "Sep 2025",
    desc: "Merit-based entrance scholarship for exceptional academic achievement and leadership potential.",
    accent: "#56e694",
  },
  {
    icon: "🥇",
    title: "Gold Medal — 19th National Astronomy & Astrophysics Olympiad",
    subtitle: "Young Scholars Club, Tehran, Iran",
    year: "Sep 2023",
    desc: "Achieved the highest national score in Stellar Astrophysics",
    accent: "#56e694",
  },
  {
    icon: "🥉",
    title: "Bronze Medal — 18th National Astronomy & Astrophysics Olympiad",
    subtitle: "Young Scholars Club, Tehran, Iran",
    year: "Sep 2022",
    accent: "#56e694",
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
            transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.12s",
            boxShadow: "none",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(86, 230, 148, 0.05)";
            el.style.borderColor = "rgba(86, 230, 148, 0.25)";
            el.style.boxShadow = `0 6px 18px ${a.accent}22`;
            el.style.transform = "translateY(-2px)";
            el.style.borderLeft = `4px solid ${a.accent}`;
            const h3 = el.querySelector("h3");
            if (h3) h3.style.fontWeight = 800;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(255,255,255,0.03)";
            el.style.borderColor = "rgba(255,255,255,0.07)";
            el.style.boxShadow = "none";
            el.style.transform = "none";
            el.style.borderLeft = `3px solid ${a.accent}`;
            const h3 = el.querySelector("h3");
            if (h3) h3.style.fontWeight = 700;
          }}
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
                {a.title === "Erich Vogt First Year Summer Research Experience (FYSRE)" ? (
                  <a
                    href="https://phas.ubc.ca/erich-vogt-first-year-summer-research-experience-fysre"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      borderBottom: "1px dotted rgba(255,255,255,0.4)",
                    }}
                  >
                    {a.title}
                  </a>
                ) : (
                  a.title
                )}
              </h3>

              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  color: a.accent,
                  letterSpacing: "0.07em",
                  textAlign: "right",
                  opacity: 0.8,
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