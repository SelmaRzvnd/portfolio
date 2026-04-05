export default function Work() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">👨‍🏫 Teaching</h3>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <p className="font-bold">Astronomy Olympiad Mentor</p>
          <p className="text-sm opacity-70">NODET High Schools • 2023-2025</p>
          <p className="text-sm mt-2">Instructed advanced data analysis to National Olympiad candidates.</p>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">🤝 Leadership</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">🏠 <span className="font-bold">UBC Housing Council</span> — Place Vanier Residence</li>
          <li className="flex items-center gap-2">💻 <span className="font-bold">UBC YouCode</span> — Tech Volunteer</li>
          <li className="flex items-center gap-2">🌱 <span className="font-bold">Tamozi NGO</span> — Environmental Volunteer</li>
        </ul>
      </section>
    </div>
  );
}