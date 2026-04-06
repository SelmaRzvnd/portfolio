export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="group border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          🧠 Noumena 
          <span className="text-xs bg-purple-500 px-2 rounded">Hackathon</span>
        </h3>
        <p className="text-sm opacity-80 mb-2">
          Designed a speculative neural‑capture app with full UX prototyping in Figma. 
          Built an astronomical visual identity and multi‑mode thought/dream capture system.
        </p>
        <code className="text-xs text-purple-300">Figma • UX Design • Concept Dev</code>
      </div>

      <div className="group border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">🌐 TechLelum</h3>
        <p className="text-sm opacity-80 mb-2">
          Built core React components and designed the initial UI/UX for a youth tech learning platform.
        </p>
        <code className="text-xs text-blue-300">React • Figma • Frontend</code>
      </div>

      <div className="group pb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">🕹️ Rogue-like Terminal Game</h3>
        <p className="text-sm opacity-80 mb-2">
          Developed a C-based rogue‑like with procedural generation and turn‑based combat.
        </p>
        <code className="text-xs text-orange-300">C • ncurses</code>
      </div>

      <div className="group border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">⭐ Binary Star Simulation</h3>
        <p className="text-sm opacity-80 mb-2">
          Simulated eclipsing binary systems with 3D orbital visualizations and luminosity curves.
        </p>
        <code className="text-xs text-green-300">Python • NumPy • Astropy</code>
      </div>
    </div>

  );
}