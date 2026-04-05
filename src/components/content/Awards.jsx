export default function Awards() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 bg-gradient-to-r from-yellow-500/20 to-transparent p-4 rounded-lg border-l-4 border-yellow-500">
        <span className="text-3xl">🥇</span>
        <div>
          <h3 className="font-bold">Gold Medal - National Astronomy Olympiad</h3>
          <p className="text-sm opacity-80">Top 10 High Schoolers Nationwide (Iran)</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border-l-4 border-blue-400">
        <span className="text-3xl">🌎</span>
        <div>
          <h3 className="font-bold">Outstanding International Student Award</h3>
          <p className="text-sm opacity-80">UBC Merit-based Entrance Scholarship</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border-l-4 border-purple-400">
        <span className="text-3xl">🔬</span>
        <div>
          <h3 className="font-bold">Erich Vogt FYSRE</h3>
          <p className="text-sm opacity-80">Competitive First-Year Research Experience @ UBC</p>
        </div>
      </div>
    </div>
  );
}