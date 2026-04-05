export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="group border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">🧠 Noumena <span className="text-xs bg-purple-500 px-2 rounded">Hackathon</span></h3>
        <p className="text-sm opacity-80 mb-2">Neural Thought Capture App. Built astronomical visual identity & UX.</p>
        <code className="text-xs text-purple-300">Figma • UX Design • Astronomy Aesthetics</code>
      </div>

      <div className="group border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">⭐ Binary Star Sim</h3>
        <p className="text-sm opacity-80 mb-2">3D orbital visualizations of eclipsing binary systems with luminosity curves.</p>
        <code className="text-xs text-green-300">Python • NumPy • Astropy • 3D Math</code>
      </div>

      <div className="group pb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">🕹️ Rogue-like Terminal</h3>
        <p className="text-sm opacity-80 mb-2">Procedural generation and turn-based combat in a C-based terminal environment.</p>
        <code className="text-xs text-orange-300">C • ncurses • Procedural Generation</code>
      </div>
    </div>
  );
}