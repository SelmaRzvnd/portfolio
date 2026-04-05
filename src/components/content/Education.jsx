export default function Education() {
  return (
    <div className="space-y-6">
      <section>
        <div className="flex justify-between items-start border-l-2 border-blue-400 pl-4 py-1">
          <div>
            <h3 className="text-xl font-bold">🎓 University of British Columbia</h3>
            <p className="text-blue-300 italic">Combined Honours in Physics & Computer Science</p>
          </div>
          <span className="text-right text-sm opacity-80">2025 — Present<br/>Vancouver, BC</span>
        </div>
        <p className="mt-2 text-lg font-semibold">✨ GPA: 93.4%</p>
      </section>

      <section className="space-y-3">
        <h4 className="text-lg font-bold flex items-center gap-2">📜 Certifications</h4>
        <div className="grid grid-cols-1 gap-2 text-sm">
          {["Data Analysis (Python) — IBM", "AI Introduction — IBM", "Web Dev Fundamentals — IBM", "Quantum Tech — Sharif Institute"].map((cert) => (
            <div key={cert} className="bg-white/5 p-2 rounded border border-white/10">
              🔹 {cert}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}