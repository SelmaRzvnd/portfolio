export default function Research() {
  const studies = [
    {
      title: "🕳️ Black Hole Simulations (REX)",
      desc: "Built a Julia framework for particle trajectories around Schwarzschild black holes. Classified 160k parameter combos.",
      tags: ["Julia", "Physics", "3D Viz"]
    },
    {
      title: "🌌 CNN Galaxy Classification",
      desc: "Developed a CNN for galaxy merger classification using simulated NIRCam images. Collaborative with Caltech.",
      tags: ["Python", "Machine Learning", "CNN"]
    },
    {
      title: "🔭 Cold Dust Analysis (IPM)",
      desc: "Analyzed NIKA2 camera data from the IRAM 30m telescope. Modeled SED to link dust to star formation.",
      tags: ["Python", "DS9", "Astrophysics"]
    }
  ];

  return (
    <div className="space-y-4">
      {studies.map((s) => (
        <div key={s.title} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-colors">
          <h3 className="font-bold text-lg">{s.title}</h3>
          <p className="text-sm text-gray-300 my-2">{s.desc}</p>
          <div className="flex gap-2">
            {s.tags.map(tag => <span key={tag} className="text-[10px] bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30">{tag}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}