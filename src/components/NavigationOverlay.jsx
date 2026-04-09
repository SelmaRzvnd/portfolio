"use client";

import React, { useState, useEffect, useRef } from "react";

export default function NavigationOverlay({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  const navItems = [
    { id: "about", category: "entry", label: "profile" },
    { id: "education", category: "trace", label: "foundations" },
    { id: "work", category: "record", label: "experience" },
    { id: "projects", category: "output", label: "creations" },
    { id: "research", category: "inquiry", label: "analysis" },
    { id: "awards", category: "merit", label: "recognition" },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!panelRef.current) return;
      const x = (e.clientX - window.innerWidth / 2) / 150;
      const y = (e.clientY - window.innerHeight / 2) / 150;
      panelRef.current.style.setProperty('--mx', `${x}px`);
      panelRef.current.style.setProperty('--my', `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        .minimal-panel {
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1000;
          backdrop-filter: blur(1px);
          border: 1.5px solid rgba(255, 255, 255, 0.12);
          padding: 1.25rem;
          color: #fff;
          width: 190px;
          /* The magic: transform uses the CSS variables set by the mouse move */
          transform: translate3d(var(--mx, 0), var(--my, 0), 0);
          transition: transform 0.1s ease-out, height 0.4s ease;
        }

        .nav-list {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
          border-top: 1px solid transparent;
        }

        .nav-list.expanded {
          max-height: 400px;
          opacity: 1;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 2px solid rgba(255, 255, 255, 0.43);
        }

        .nav-btn {
          display: flex;
          align-items: center;
          background: none;
          color: rgb(255, 255, 255);
          padding: 0.3rem 0;
          cursor: pointer;
          font-family: monospace;
          transition: 0.2s;
        }

        .nav-btn:hover {
          color: #fff;
          transform: translateX(8px);
        }

        .category { font-size: 0.5rem; width: 60px; opacity: 0.5; }
        .label { font-size: 0.7rem; letter-spacing: 0.05em; }
      `}</style>

      <div className="minimal-panel" ref={panelRef}>
        <div style={{ cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
          <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', fontWeight: 'bold' }}>SELMA REZAVAND</div>
          <div style={{ fontSize: '0.5rem', opacity: 0.4, fontFamily: 'monospace' }}>
             {isOpen ? "> DISCONNECT_SESSION" : "> INITIALIZE_UPLINK"}
          </div>
        </div>

        <div className={`nav-list ${isOpen ? "expanded" : ""}`}>
          {navItems.map((item) => (
            <button key={item.id} className="nav-btn" onClick={() => onNavigate(item.id)}>
              <span className="category">[{item.category}]</span>
              <span className="label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}