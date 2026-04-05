// components/PlanetModal.jsx
export default function PlanetModal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-white shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl"
        >
          &times;
        </button>
        
        <h2 className="text-3xl font-bold mb-4 border-b border-white/10 pb-2">
          {title}
        </h2>
        
        <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
          {content}
        </div>
      </div>
    </div>
  );
}