import { Heart } from "lucide-react";

const Newletter = () => {
  return (
    <div className="bg-slate-950 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-slate-950/10">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>

      <Heart className="h-8 w-8 mb-4 text-orange-400 opacity-90" />
      <h3 className="text-lg font-black tracking-tight mb-2">Subscribe to Field Briefs</h3>
      <p className="text-xs text-slate-400 leading-relaxed mb-6 font-normal">
        Receive tactical status briefings, program execution announcements, and verified structural impact reports direct.
      </p>
      <form className="space-y-2 relative z-10" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Provide professional email..."
          className="w-full px-4 py-3 bg-white/10 rounded-xl text-xs text-white placeholder-slate-500 border border-white/5 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:bg-white/10 transition-all"
          required
        />
        <button
          type="submit"
          className="w-full bg-white text-slate-950 py-3 rounded-xl font-black text-xs tracking-tight hover:bg-slate-100 transition shadow-md"
        >
          Authorize Integration
        </button>
      </form>
      <p className="text-[10px] text-slate-500 font-medium text-center mt-3">
        Zero telemetry leakage. Opt-out anytime.
      </p>
    </div>
  );
}

export default Newletter;