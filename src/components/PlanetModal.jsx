"use client";

export default function PlanetModal({ isOpen, onClose, title, content, themeColor = "#ffffff", origin }) {
  if (!isOpen) return null;

  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

  const startX = origin?.x ?? centerX;
  const startY = origin?.y ?? centerY;

  const tx = startX - centerX;
  const ty = startY - centerY;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(12px); }
        }

        @keyframes portalIn {
          0% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
            filter: brightness(2) blur(10px);
          }
          70% {
            transform: translate(0px, 0px) scale(1.05);
            opacity: 1;
            filter: brightness(1.2) blur(0px);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
            opacity: 1;
            filter: brightness(1) blur(0px);
          }
        }

        .animate-backdrop {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-modal-core {
          animation: portalIn 0.9s cubic-bezier(0.46, 1, 0.3, 1) forwards;
          transform-origin: center center;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${themeColor}; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
      `}</style>

      <div className="absolute inset-0 bg-black/80 animate-backdrop" onClick={onClose} />

      <div
        className="relative w-full max-w-2xl bg-[#050507]/90 backdrop-blur-3xl rounded-3xl p-10 text-white animate-modal-core"
        style={{
          "--tx": `${tx}px`,
          "--ty": `${ty}px`,
          border: `1px solid ${themeColor}40`,
          boxShadow: `0 0 80px -20px ${themeColor}30, inset 0 0 30px ${themeColor}10`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/30 hover:text-white transition-all hover:rotate-90 text-3xl"
        >
          &times;
        </button>

        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-mono mb-2 block">
            System.Data_Node
          </span>
          <h2 className="text-4xl font-bold tracking-tight border-b pb-4" style={{ borderColor: `${themeColor}30` }}>
            {title}
          </h2>
        </div>

        <div className="space-y-4 overflow-y-auto max-h-[55vh] pr-4 custom-scrollbar font-mono text-sm leading-relaxed text-white/80">
          {content}
        </div>

        <div
          className="absolute top-0 left-0 w-12 h-12 rounded-tl-3xl"
          style={{
            borderTop: `2px solid ${themeColor}`,
            borderLeft: `2px solid ${themeColor}`,
            opacity: 0.4,
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-12 h-12 rounded-br-3xl"
          style={{
            borderBottom: `2px solid ${themeColor}`,
            borderRight: `2px solid ${themeColor}`,
            opacity: 0.4,
          }}
        />
      </div>
    </div>
  );
}