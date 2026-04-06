"use client";

import React, { useState, useEffect, useRef } from "react";

export default function NavigationOverlay({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  const navItems = [
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "work", label: "Work" },
    { id: "projects", label: "Projects" },
    { id: "research", label: "Research" },
    { id: "awards", label: "Awards" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      <style>{`
        .hud-panel {
          position: absolute;
          top: 2rem;
          left: 2rem;
          z-index: 1000;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(102, 220, 220, 0.59);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 0 20px rgba(12, 125, 238, 0.2);
          color: white;
          font-family: system-ui, -apple-system, sans-serif;
          min-width: 120px;
        }

        .hud-name {
          margin: 0 0 0.25rem 0;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .hud-prompt {
          margin: 0;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .hud-prompt:hover {
          color: white;
          text-shadow: 0 0 8px rgb(251, 255, 0);
        }

        .hud-menu {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          max-height: 0;
          opacity: 0;
          margin-top: 0;
        }

        .hud-menu.open {
          max-height: 300px;
          opacity: 1;
          margin-top: 1.5rem;
        }

        .hud-nav-item {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          text-align: left;
          padding: 0;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .hud-nav-item:hover {
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          transform: translateX(6px);
        }
      `}</style>

      <div className="hud-panel" ref={panelRef}>
        <h1 className="hud-name">Selma Rezavand</h1>
        <p 
          className="hud-prompt" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Collapse universe ↑" : "Explore my universe!"}
        </p>

        <div className={`hud-menu ${isOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className="hud-nav-item"
              onClick={() => handleItemClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}