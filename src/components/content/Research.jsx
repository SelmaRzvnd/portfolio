export default function Research() {
  const studies = [
    {
      title: "🕳️ Black Hole Trajectory Simulations (UBC REX)",
      desc: "Built a Julia framework to simulate particle trajectories around Schwarzschild black holes, including a geodesic solver and phase‑space classification across 160,000 parameter combinations. Presented findings at MURC.",
      tags: ["Julia", "General Relativity", "3D Visualization"]
    },
    {
      title: "🌌 Galaxy Merger Classification (IASBS × Caltech)",
      desc: "Developed a CNN to classify galaxy mergers using simulated NIRCam/F277W images from IllustrisTNG and the Santa Cruz SAM. Applied the model to COSMOS-Web survey data and manually validated predictions.",
      tags: ["Python", "Machine Learning", "Astrophysics"]
    },
    {
      title: "🔭 Cold Dust Emission Analysis (IPM)",
      desc: "Analyzed millimeter‑wavelength observations from the NIKA2 camera on the IRAM 30m telescope. Modeled SEDs to study correlations between dust properties and star formation rates.",
      tags: ["Python", "DS9", "SED Modelling"]
    }
  ];

  return (
    <div className="space-y-4">
      {studies.map((s) => (
        <div 
          key={s.title} 
          className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-colors"
        >
          <h3 className="font-bold text-lg">{s.title}</h3>
          <p className="text-sm text-gray-300 my-2">{s.desc}</p>
          <div className="flex gap-2">
            {s.tags.map(tag => (
              <span 
                key={tag} 
                className="text-[10px] bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
