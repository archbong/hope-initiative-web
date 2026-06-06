import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useEvents } from "../../../hooks/useEvent";


const UpcomingEvent = () => {
  const { upcomingEvents } = useEvents()

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
      <h3 className="text-base font-black text-slate-900 mb-5 flex items-center tracking-tight">
        <Calendar className="h-4 w-4 mr-2 text-orange-500" />
        Upcoming Scheduling
      </h3>
      <div className="space-y-4">
        {upcomingEvents.length === 0 ? (
          <p className="text-slate-400 text-xs font-medium py-2">No future entries flagged at present phase.</p>
        ) : (
          upcomingEvents.slice(0, 3).map((event: any) => (
            <Link
              key={event.id}
              to={`/news-events/${event.slug}`}
              className="group block border-b border-slate-100 last:border-0 pb-4 last:pb-0 hover:bg-slate-50/50 p-2 rounded-xl transition-all"
            >
              <h4 className="text-sm font-bold text-slate-800 mb-2 leading-tight group-hover:text-orange-500 transition-colors line-clamp-2">
                {event.title}
              </h4>
              <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1 text-slate-300" />
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span className="flex items-center truncate">
                  <MapPin className="h-3 w-3 mr-0.5 text-slate-300" />
                  {event.location}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingEvent;