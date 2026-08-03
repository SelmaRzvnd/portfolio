export default function Work() {
  return (
    <div className="space-y-6">

      {/* Work Experience */}
      
      <div>
        <h4 style={{
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(120,180,255,0.85)",   // blue-gold header
          fontFamily: "monospace",
          marginBottom: "0.75rem",
        }}>
          ◈ Work Experience
        </h4>

        <div style={{
          marginTop: "0.6rem",
          padding: "1.1rem 1.2rem",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(120,180,255,0.15)",
          borderLeft: "3px solid rgba(120,180,255,0.55)",
        }}>
<div style={{
          marginTop: "0.6rem",
          padding: "1.1rem 1.2rem",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(120,180,255,0.15)",
          borderLeft: "3px solid rgba(120,180,255,0.55)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.25rem" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.92rem", color: "#fff", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>🔭</span> Research Assistant — FYSRE Award
            </h3>
            <span style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              color: "rgba(120,180,255,0.85)",
              letterSpacing: "0.07em",
            }}>May 2026 — Aug 2026</span>
          </div>

          <p style={{ fontSize: "0.73rem", color: "rgba(120,180,255,0.7)", fontFamily: "monospace", letterSpacing: "0.04em", marginBottom: "0.15rem" }}>
            Department of Physics &amp; Astronomy
          </p>
          <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", fontFamily: "monospace", marginBottom: "0.6rem" }}>
            University of British Columbia · Vancouver, BC
          </p>

          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.55, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <p>
              Led two major exoplanet research initiatives with a heavy focus on large-scale scientific computing and data analysis:
            </p>
            <p>
              <strong>White Dwarf Transiting Exoplanet Detection Pipeline:</strong> Architected an end-to-end Python data pipeline deployed on HPC clusters to process ~99,000 time-series datasets from NASA's TESS mission. Engineered synthetic dataset simulations to stress-test vetting algorithms for ultra-fast white dwarf transits that break standard tools. By optimizing Box Least Squares (BLS) logic and custom thresholding metrics, and fixing critical flaws in the core injection logic, I raised the signal recovery rate from 1.7% to 96%.
            </p>
            <p>
              <strong>Hot Neptune (TOI-5872.01):</strong> Worked on characterizing a rare planet candidate sitting in the Neptune Desert. To officially confirm the planet and measure its mass, I co-authored a rigorous observing proposal for the MAROON-X spectrograph on the Gemini North telescope. The proposal ranked in the first quartile of all submissions globally and secured observation time.
            </p>
          </div>
        </div>

          <p style={{ fontSize: "0.73rem", color: "rgba(120,180,255,0.7)", fontFamily: "monospace", letterSpacing: "0.04em", marginBottom: "0.15rem" }}>
            Department of Physics &amp; Astronomy
          </p>
          <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", fontFamily: "monospace", marginBottom: "0.6rem" }}>
            University of British Columbia · Vancouver, BC
          </p>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>
          Engineered a large-scale exoplanet detection pipeline for NASA's TESS mission, redesigning the search and validation logic from the ground up to handle white dwarf transits — signals so brief that standard astronomical detection tools break on them. Diagnosed and fixed critical flaws in the pipeline's core injection and vetting logic, raising signal recovery from 1.7% to 96% across ~99,000 processed light curves. Ran the validated pipeline on real TESS data and confirmed a strong planet candidate. Also worked on a separate hot Neptune candidate (TOI-5872), co-writing a successful, first-quartile-ranked observing proposal for the MAROON-X spectrograph on Gemini North to measure its mass.
        </p>
        </div>

        <div style={{
          padding: "1.1rem 1.2rem",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(120,180,255,0.15)",   // blue border
          borderLeft: "3px solid rgba(120,180,255,0.55)", // blue accent bar
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.25rem" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.92rem", color: "#fff", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>👨‍🏫</span> Teaching Assistant
            </h3>
            <span style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              color: "rgba(120,180,255,0.85)",   // blue date
              letterSpacing: "0.07em",
            }}>Oct 2023 — Apr 2025</span>
          </div>

          <p style={{ fontSize: "0.73rem", color: "rgba(120,180,255,0.7)", fontFamily: "monospace", letterSpacing: "0.04em", marginBottom: "0.15rem" }}>
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
          color: "rgba(120,180,255,0.85)",   // blue header
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
                border: "1px solid rgba(120,180,255,0.12)",   // blue border
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(120,180,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(120,180,255,0.25)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(120,180,255,0.12)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                <div>
                  <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{item.org}</span>
                  <span style={{ fontSize: "0.73rem", color: "rgba(120,180,255,0.7)", marginLeft: "0.4rem" }}>— {item.role}</span>
                  <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", marginTop: "0.05rem" }}>{item.location}</p>
                </div>
              </div>
              <span style={{
                flexShrink: 0,
                fontFamily: "monospace",
                fontSize: "0.63rem",
                color: "rgba(120,180,255,0.55)",   // blue date
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
