export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-icy rounded-sm flex items-center justify-center font-mono font-bold text-navy text-xs">
            L
          </div>
          <span className="font-bold tracking-tighter text-lg">LOGIQ STUDIO</span>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <a href="#" className="font-mono text-[10px] text-white/40 hover:text-icy tracking-widest uppercase">Privacy_Policy</a>
          <a href="#" className="font-mono text-[10px] text-white/40 hover:text-icy tracking-widest uppercase">Terms_Of_Service</a>
          <a href="#" className="font-mono text-[10px] text-white/40 hover:text-icy tracking-widest uppercase">Security_Audit</a>
        </div>

        <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
          © 2025 LOGIQ_STUDIO // ALL_RIGHTS_RESERVED
        </p>
      </div>
    </footer>
  );
}
