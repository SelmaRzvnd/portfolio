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
          <p>
            <strong>White Dwarf Transiting Exoplanet Detection Pipeline:</strong> Architected an end-to-end Python data pipeline to process ~99,000 high-frequency time-series datasets from NASA's TESS mission, deployed on GPU-accelerated remote servers. Because white dwarf transits are ultra-fast (often just 1–2 datapoints), standard pipelines fail to detect them. Lacking real-world benchmark data, I engineered synthetic dataset simulations to stress-test our algorithms. By optimizing Box Least Squares (BLS) logic and custom thresholding metrics, and fixing critical flaws in the vetting logic (e.g., negative flux inversion and generalized stellar-density assumptions), I boosted our signal recovery rate from 1.7% to 96.0%. Applied the validated pipeline to real data, confirming a strong planet candidate.
          </p>
          <p>
            <strong>Hot Neptune Characterization (TOI-5872.01):</strong> Investigated a rare "hot Neptune" candidate located in the sparsely populated Neptune Desert. To measure its mass/density and refine theories on planetary evolution, I co-authored a rigorous observational proposal to obtain high-precision radial velocity data using the MAROON-X spectrograph on the Gemini North Telescope. The proposal successfully secured allocation, scoring in the first quartile of all global submissions.
          </p>
        </div>
      ),
      tags: ["Python", "Scientific Computing", "Signal Processing", "Data Pipelines"],
      color: "#facc15",
      supervisor: "Michelle Kunimoto",
    },
  {
    emoji: "🕳️",
    title: "Mapping Particle Fates Around Black Holes: A Computational Phase-Space Analysis of Schwarzschild Geodesics",
    org: "UBC Undergraduate Research Opportunities (REX Program) — Published",
    period: "Oct 2025 — Mar 2026",
    location: "Vancouver, BC",
    desc: "Developed a computational framework in Julia to explore particle motion around a non-rotating (Schwarzschild) black hole. Solved the geodesic equations using a high-order adaptive integrator, classifying particle trajectories across 160,000 combinations of energy and angular momentum to produce a complete phase portrait of orbital outcomes — captured, bound, or escaped. Every numerical boundary was validated against exact analytical predictions from general relativity. Generated 3D visualizations of distinct orbit types, including precessing rosette orbits, whirl-and-plunge captures near the stability boundary, and vertically oscillating trajectories. Presented findings at MURC (UBC's biggest Multidisciplinary Research Conference).",
    tags: ["Julia", "General Relativity", "Numerical Methods", "3D Visualization"],
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
  const [expanded, setExpanded] = useState({});

  return (
    <div className="space-y-4">
      {studies.map((s) => {
        const isOpen = expanded[s.title];
        return (
          <div key={s.title} style={{ /* unchanged card styles */ }}>
            {/* Title row — unchanged */}
            {/* Org + location — unchanged */}

            <div
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.6,
                marginBottom: "0.5rem",
                maxHeight: isOpen ? "none" : "3.2rem",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {s.desc}
            </div>

            <button
              onClick={() => setExpanded((prev) => ({ ...prev, [s.title]: !isOpen }))}
              style={{
                background: "none",
                border: "none",
                color: s.color,
                fontFamily: "monospace",
                fontSize: "0.68rem",
                cursor: "pointer",
                padding: 0,
                marginBottom: "0.65rem",
              }}
            >
              {isOpen ? "▲ Show less" : "▼ Read more"}
            </button>

            <div style={{ /* tags + supervisor row — unchanged */ }}>
              {/* unchanged */}
            </div>
          </div>
        );
      })}
    </div>
  );
}