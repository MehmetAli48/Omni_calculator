import { Calculator } from '../components/Calculator/Calculator';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background Graphic Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 border border-primary/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-64 h-64 border border-primary/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-1 border-t border-primary/10 rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-1 border-t border-primary/10 -rotate-45" />
      </div>

      {/* Main Content */}
      <div className="z-10 w-full flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-[0.2em] uppercase text-primary mb-2 glitch-hover cursor-default">
            Omni-Calc
          </h1>
          <p className="text-[10px] text-primary/40 tracking-widest font-bold">
            NEURAL-LINK ARCHITECTURE v2.0
          </p>
        </div>

        <Calculator />
        
        <div className="mt-8 flex gap-8">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-primary/30 font-bold uppercase mb-1">Status</span>
            <span className="text-[12px] text-primary flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
              ONLINE
            </span>
          </div>
          <div className="flex flex-col items-center border-l border-primary/20 pl-8">
            <span className="text-[10px] text-primary/30 font-bold uppercase mb-1">Encrypted</span>
            <span className="text-[12px] text-primary font-bold">AES-256</span>
          </div>
        </div>
      </div>
    </main>
  );
}
