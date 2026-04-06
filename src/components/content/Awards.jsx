export default function Awards() {
  return (
    <div className="space-y-4">

      <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border-l-4 border-purple-400">
        <span className="text-3xl">🔬</span>
        <div>
          <h3 className="font-bold">Erich Vogt First Year Summer Research Experience (FYSRE)</h3>
          <p className="text-sm opacity-80">
            Competitive research program providing first‑year students hands‑on experience in physics & astronomy.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border-l-4 border-blue-400">
        <span className="text-3xl">🌎</span>
        <div>
          <h3 className="font-bold">Outstanding International Student Award</h3>
          <p className="text-sm opacity-80">
            UBC merit‑based entrance scholarship for academic excellence and leadership.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-gradient-to-r from-yellow-500/20 to-transparent p-4 rounded-lg border-l-4 border-yellow-500">
        <span className="text-3xl">🥇</span>
        <div>
          <h3 className="font-bold">Gold Medal — National Astronomy Olympiad</h3>
          <p className="text-sm opacity-80">
            Top 10 nationwide; highest team score in Stellar Astrophysics & Cosmology.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border-l-4 border-orange-400">
        <span className="text-3xl">🥉</span>
        <div>
          <h3 className="font-bold">Bronze Medal — National Astronomy Olympiad</h3>
          <p className="text-sm opacity-80">
            Awarded for outstanding performance in theoretical and observational rounds.
          </p>
        </div>
      </div>

    </div>
  );
}
