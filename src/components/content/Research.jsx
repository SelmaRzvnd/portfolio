"use client";
import { useState } from "react";

const studies = [
  {
    emoji: "⚪",
    title: "Exoplanet Detection & Characterization: White Dwarfs & Hot Neptunes",
    org: "UBC Department of Physics & Astronomy — Erich Vogt FYSRE Award",
    period: "May 2026 — Aug 2026",
    location: "Vancouver, BC",
    desc: (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <p style={{ margin: 0 }}>
          <a
            href="https://phas.ubc.ca/erich-vogt-first-year-summer-research-experience-fysre#:~:text=Selma%20Rezavand%20analyzes%20White%20Dwarf%20Transiting%20Exoplanets%20with%20Michelle%20Kunimoto"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ef9ec6", fontStyle: "italic", textDecoration: "none", borderBottom: "1px dotted #ef9ec6" }}
          >
            Read the full UBC feature on this project →
          </a>
        </p>
        <p style={{ margin: 0, fontStyle: "italic", color: "#fff" }}>
          Only one transiting exoplanet around a white dwarf has ever been confirmed; not because they're extremely rare, but because standard detection tools break on them. This summer, I built the pipeline to help find the next one.
        </p>
        <p style={{ margin: 0 }}>
          <strong>White Dwarf Transiting Exoplanet Detection Pipeline:</strong> Architected an end-to-end Python data pipeline to search for ultra-fast exoplanet transits, batch-processing 99,000+ high-frequency time-series light curves from NASA's TESS mission on GPU-accelerated remote servers. Because white dwarf transits are so brief they're often captured in just 1–2 datapoints, standard pipelines fail to detect them outright. Lacking real-world benchmark data, I engineered synthetic dataset simulations to stress-test our algorithms, debug edge cases, and establish ground-truth benchmarks. By resolving critical flaws in the core injection and vetting logic and optimizing detection thresholds, I boosted signal recovery from 1.7% to 96.0%. Applied the validated pipeline to real TESS data and confirmed a strong planet candidate across multiple observing sectors.
        </p>
        <p style={{ margin: 0, fontStyle: "italic", color: "#fff" }}>
          Discovering a rare planet in a region where planets almost never survive.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Hot Neptune Confirmation and Characterization:</strong> Investigated a rare "hot Neptune" candidate located in the sparsely populated "Neptune Desert". To measure its mass and density and refine theories on planetary evolution, I co-authored a rigorous observational proposal to obtain high-precision radial velocity data using the MAROON-X spectrograph on the Gemini North Telescope. The proposal successfully secured allocation, scoring in the first quartile of all global submissions.
        </p>
      </div>
    ),
    tags: ["Python", "Scientific Computing", "Signal Processing", "Data Pipelines"],
    accent: "#ef9ec6",
    supervisor: "Michelle Kunimoto",
    expandable: true,
    linkUrl: "https://phas.ubc.ca/erich-vogt-first-year-summer-research-experience-fysre",
    linkText: "→ About the FYSRE Award",
  },
  {
    emoji: "🕳️",
    title: "Mapping Particle Fates Around Black Holes: A Computational Phase-Space Analysis of Schwarzschild Geodesics",
    org: "UBC Undergraduate Research Opportunities (REX Program) — Published",
    period: "Oct 2025 — Mar 2026",
    location: "Vancouver, BC",
    desc: (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <p style={{ margin: 0 }}>
          Developed a computational framework in Julia to explore particle motion around a non-rotating (Schwarzschild) black hole. Solved the geodesic equations using a high-order adaptive integrator, classifying particle trajectories across 160,000 combinations of energy and angular momentum to produce a complete phase portrait of orbital outcomes — captured, bound, or escaped. Every numerical boundary was validated against exact analytical predictions from general relativity. Generated 3D visualizations of distinct orbit types, including precessing rosette orbits, whirl-and-plunge captures near the stability boundary, and vertically oscillating trajectories. Presented findings at MURC (UBC's biggest Multidisciplinary Research Conference).
        </p>
      </div>
    ),
    tags: ["Julia", "Algorithm Design", "Computational Modeling", "Data Visualization", "Numerical Analysis"],
    accent: "#ef9ec6",
    supervisor: "Haozhi Hong",
    expandable: true,
    linkUrl: "https://cjur.ca/wp-content/uploads/2026/05/MURC-x-CJUR-2026.pdf",
    linkText: "→ Read in the MURC × CJUR 2026 Proceedings (p. 79)",
  },
  {
    emoji: "🌌",
    title: "Galaxy Merger Classification",
    org: "IASBS × Caltech",
    period: "Nov 2024 — Present",
    location: "Remote / Collaborative",
    desc: "Developed a CNN to classify galaxy mergers using simulated NIRCam/F277W images from IllustrisTNG100-1 and the Santa Cruz SAM. Applied model to COSMOS-Web survey data and manually validated hundreds of predictions.",
    tags: ["Python", "Machine Learning", "Astrophysics"],
    accent: "#ef9ec6",
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
    accent: "#ef9ec6",
    supervisor: "Dr. Golshan Ejlali (IPM)",
  },
];

export default function Research() {
  const [expanded, setExpanded] = useState({});

  return (
    <div className="space-y-4">
      {studies.map((s) => {
        const isOpen = expanded[s.title];
        return (
        <div
          key={s.title}
          style={{
            padding: "1.3rem 1.2rem",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderLeft: `3px solid ${s.accent}`, 
            transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.12s",
            boxShadow: "none",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(239, 158, 198, 0.05)";
            el.style.borderColor = "rgba(239, 158, 198, 0.25)";
            el.style.boxShadow = `0 6px 18px ${s.accent}22`;
            el.style.transform = "translateY(-2px)";
            el.style.borderLeft = `4px solid ${s.accent}`

            const h3 = el.querySelector("h3");
            if (h3) h3.style.fontWeight = 800;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(255,255,255,0.03)";
            el.style.borderColor = "rgba(255,255,255,0.08)";
            el.style.boxShadow = "none";
            el.style.transform = "none";
            el.style.borderLeft = `3px solid ${s.accent}`;

            const h3 = el.querySelector("h3");
            if (h3) h3.style.fontWeight = 700;
          }}
        >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.4rem",
                marginBottom: "0.25rem",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "0.93rem",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  margin: 0,
                }}
              >
                <span>{s.emoji}</span> {s.title}
              </h3>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  color: s.accent,
                  letterSpacing: "0.07em",
                  opacity: 0.85,
                  flexShrink: 0,
                }}
              >
                {s.period}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.6rem",
                alignItems: "center",
                marginBottom: "0.55rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  color: s.accent,
                  fontFamily: "monospace",
                  letterSpacing: "0.05em",
                  opacity: 0.85,
                }}
              >
                {s.org}
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "monospace",
                }}
              >
                · {s.location}
              </span>
            </div>

            {s.expandable ? (
              <>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.6,
                    marginBottom: "0.4rem",
                    maxHeight: isOpen ? "1000px" : "6rem",
                    overflow: "hidden",
                    position: "relative",
                    transition: "max-height 0.3s ease-in-out",
                  }}
                >
                  {s.desc}
                  {!isOpen && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "1.5rem",
                        background: "linear-gradient(transparent, #1a1a1a)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>

                <button
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [s.title]: !isOpen }))
                  }
                  style={{
                    background: "none",
                    border: "none",
                    color: s.accent,
                    fontFamily: "monospace",
                    fontSize: "0.68rem",
                    cursor: "pointer",
                    padding: 0,
                    marginBottom: s.linkUrl ? "0.4rem" : "0.65rem",
                    marginTop: "0.2rem",
                    display: "block",
                  }}
                >
                  {isOpen ? "▲ Show less" : "▼ Read more"}
                </button>
              </>
            ) : (
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.6,
                  marginBottom: s.linkUrl ? "0.4rem" : "0.65rem",
                }}
              >
                {s.desc}
              </div>
            )}

            {s.linkUrl && (
              <div style={{ marginBottom: "0.65rem" }}>
                <a
                  href={s.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: s.accent,
                    fontFamily: "monospace",
                    fontSize: "0.68rem",
                    textDecoration: "none",
                    borderBottom: `1px dotted ${s.accent}`,
                  }}
                >
                  {s.linkText}
                </a>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: s.expandable ? "0.2rem" : "0",
              }}
            >
              <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.63rem",
                      fontFamily: "monospace",
                      letterSpacing: "0.06em",
                      color: s.accent,
                      background: `${s.accent}12`,
                      border: `1px solid ${s.accent}30`,
                      padding: "0.15rem 0.5rem",
                      borderRadius: "3px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                style={{
                  fontSize: "0.67rem",
                  color: "rgba(255,255,255,0.3)",
                  fontStyle: "italic",
                  fontFamily: "monospace",
                }}
              >
                ↳ {s.supervisor}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}