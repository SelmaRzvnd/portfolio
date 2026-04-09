export default function Work() {
  return (
    <div className="space-y-6">

      {/* Work Experience */}
      <div>
        <h4 style={{
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(212,175,55,0.8)",
          fontFamily: "monospace",
          marginBottom: "0.75rem",
        }}>
          ◈ Work Experience
        </h4>

        <div style={{
          padding: "1.1rem 1.2rem",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderLeft: "3px solid rgba(212,175,55,0.5)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.25rem" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.92rem", color: "#fff", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>👨‍🏫</span> Teaching Assistant
            </h3>
            <span style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              color: "rgba(212,175,55,0.8)",
              letterSpacing: "0.07em",
            }}>Oct 2023 — Apr 2025</span>
          </div>

          <p style={{ fontSize: "0.73rem", color: "rgba(212,175,55,0.65)", fontFamily: "monospace", letterSpacing: "0.04em", marginBottom: "0.15rem" }}>
            Astronomy &amp; Astrophysics Olympiad
          </p>
          <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", fontFamily: "monospace", marginBottom: "0.6rem" }}>
            National Organization for Development of Exceptional Talents · Tehran, Iran
          </p>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>
            Mentored high-school students for national olympiad through advanced instruction in galactic dynamics, stellar astrophysics, and galactic astrophysics.
          </p>
        </div>
      </div>

      {/* Leadership */}
      <div>
        <h4 style={{
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(212,175,55,0.8)",
          fontFamily: "monospace",
          marginBottom: "0.75rem",
        }}>
          ◈ Leadership &amp; Activities
        </h4>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {[
            {
              icon: "💻",
              role: "Volunteer",
              org: "UBC YouCode",
              period: "2025 — Present",
              location: "Vancouver, BC",
            },
            {
              icon: "🏠",
              role: "Housing Council Member",
              org: "UBC Place Vanier Residence",
              period: "Oct 2025 — Jan 2026",
              location: "Vancouver, BC",
            },
            {
              icon: "🌱",
              role: "Environmental Volunteer",
              org: "Tamozi NGO",
              period: "Aug 2023 — Present",
              location: "Tehran, Iran",
            },
          ].map((item) => (
            <div
              key={item.org}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.6rem 0.9rem",
                borderRadius: "5px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                <div>
                  <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{item.org}</span>
                  <span style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.4)", marginLeft: "0.4rem" }}>— {item.role}</span>
                  <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", marginTop: "0.05rem" }}>{item.location}</p>
                </div>
              </div>
              <span style={{
                flexShrink: 0,
                fontFamily: "monospace",
                fontSize: "0.63rem",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.04em",
                textAlign: "right",
              }}>{item.period}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}