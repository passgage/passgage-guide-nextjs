export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-passgage-blue to-blue-600">
      <div className="text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
          Passgage Kılavuzu
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
          Next.js Migration - Phase 1: Foundation ✅
        </p>
        <div className="flex gap-4 justify-center animate-scale-in">
          <div className="card p-6">
            <h2 className="font-bold text-passgage-blue mb-2">✓ Next.js 15</h2>
            <p className="text-neutral-600 text-sm">App Router + TypeScript</p>
          </div>
          <div className="card p-6">
            <h2 className="font-bold text-passgage-blue mb-2">✓ Tailwind CSS</h2>
            <p className="text-neutral-600 text-sm">v4 + Custom Config</p>
          </div>
          <div className="card p-6">
            <h2 className="font-bold text-passgage-blue mb-2">✓ Structure</h2>
            <p className="text-neutral-600 text-sm">Components + Lib</p>
          </div>
        </div>
      </div>
    </main>
  );
}
