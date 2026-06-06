import { Heart } from "lucide-react";

const OperationalMetrics = () => {

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
      <h3 className="text-base font-black text-slate-900 mb-5 flex items-center tracking-tight">
        <Heart className="h-4 w-4 mr-2 text-orange-500" />
        Audited Operational Impact
      </h3>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="text-lg font-black text-slate-950 tracking-tight">1.2k+</div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">Assisted</div>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="text-lg font-black text-slate-950 tracking-tight">8.7k+</div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">Supplies</div>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="text-lg font-black text-slate-950 tracking-tight">15+</div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">Regions</div>
        </div>
      </div>
    </div>
  );
}

export default OperationalMetrics;