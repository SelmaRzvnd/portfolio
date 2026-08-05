"use client";

import { useCallback } from "react";

export default function Work() {
  const accentBase = "rgba(120,180,255,0.55)";
  const borderBase = "rgba(120,180,255,0.15)";
  const hoverBg = "rgba(120,180,255,0.06)";
  const normalBg = "rgba(255,255,255,0.03)";

  const applyHover = useCallback((el, opts = {}) => {
    if (!el) return;
    const { accent = accentBase, border = borderBase, bg = hoverBg } = opts;
    el.style.background = bg;
    el.style.borderColor = "rgba(120,180,255,0.25)";
    el.style.boxShadow = `0 6px 18px ${accent.replace(/0\.55\)$/, "0.14)")}`;
    el.style.transform = "translateY(-2px)";
    el.style.borderLeft = `4px solid ${accent}`;
    const h3 = el.querySelector("h3");
    if (h3) {
      h3.style.fontWeight = 800;
      h3.style.transition = "font-weight 0.12s, transform 0.12s";
    }
  }, []);

  const removeHover = useCallback((el) => {
    if (!el) return;
    el.style.background = normalBg;
    el.style.borderColor = borderBase;
    el.style.boxShadow = "none";
    el.style.transform = "none";
    el.style.borderLeft = `3px solid ${accentBase}`;
    const h3 = el.querySelector("h3");
    if (h3) h3.style.fontWeight = 700;
  }, []);

  // small helper to attach both mouse and keyboard handlers inline
  const handlersFor = (accent = accentBase) => ({
    onMouseEnter: (e) => applyHover(e.currentTarget, { accent }),
    onMouseLeave: (e) => removeHover(e.currentTarget),
    onFocus: (e) => applyHover(e.currentTarget, { accent }),
    onBlur: (e) => removeHover(e.currentTarget),
    tabIndex: 0, // make focusable for keyboard users
    style: {
      marginTop: "0.6rem",
      padding: "1.1rem 1.2rem",
      borderRadius: "8px",
      background: normalBg,
      border: `1px solid ${borderBase}`,
      borderLeft: `3px solid ${accent}`,
      transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.12s",
      outline: "none",
    },
  });

  return (
    <div className="space-y-6">
      {/* Work Experience */}
      <div>
        <h4
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(120,180,255,0.85)",
            fontFamily: "monospace",
            marginBottom: "0.75rem",
          }}
        >
          ◈ Work Experience
        </h4>

        {/* Research Assistant */}
        <div {...handlersFor(accentBase)}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.25rem" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.92rem", color: "#fff", display: "flex", alignItems: "center", gap: "0.4rem", margin: 0 }}>
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
              Led two exoplanet research initiatives focused on large-scale scientific computing: engineered a detection pipeline for ultra-fast white dwarf transits (raising signal recovery from 1.7% to 96%), and co-authored a first-quartile observing proposal for the MAROON-X spectrograph to characterize a rare hot Neptune candidate. Full details in Research section.
            </p>
          </div>
        </div>

        {/* Teaching Assistant */}
        <div {...handlersFor(accentBase)} style={{ marginTop: "0.75rem", ...handlersFor(accentBase).style }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.25rem" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.92rem", color: "#fff", display: "flex", alignItems: "center", gap: "0.4rem", margin: 0 }}>
              <span>👨‍🏫</span> Teaching Assistant
            </h3>
            <span style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              color: "rgba(120,180,255,0.85)",
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
          color: "rgba(120,180,255,0.85)",
          fontFamily: "monospace",
          marginBottom: "0.75rem",
        }}>
          ◈ Leadership &amp; Activities
        </h4>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {[
            {
              icon: "💻",
              role: "Website Developer",
              org: "UBC YouCode, Women in Computer Science Club",
              period: "2026 — Present",
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
              {...handlersFor(accentBase)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.6rem 0.9rem",
                borderRadius: "5px",
                background: normalBg,
                border: "1px solid rgba(120,180,255,0.12)",
                transition: "background 0.2s, border-color 0.2s, box-shadow 0.12s, transform 0.12s",
                ...handlersFor(accentBase).style,
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
                color: "rgba(120,180,255,0.55)",
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
