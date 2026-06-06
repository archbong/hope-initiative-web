interface FilterTabsProps {
  activeFilter: 'all' | 'anonymous' | 'public'
  onFilterChange: (filter: 'all' | 'anonymous' | 'public') => void
  counts: {
    all: number
    anonymous: number
    public: number
  }
}

const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange, counts }) => {
  const tabs = [
    { id: 'all' as const, label: 'All Donations', count: counts.all, icon: '📊' },
    { id: 'anonymous' as const, label: 'Anonymous', count: counts.anonymous, icon: '🔒' },
    { id: 'public' as const, label: 'Public', count: counts.public, icon: '👁️' }
  ]

  return (
    <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-100 inline-flex w-full sm:w-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onFilterChange(tab.id)}
          className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${activeFilter === tab.id
            ? 'bg-sky-600 text-white shadow-md'
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            <span className={`text-xs ${activeFilter === tab.id ? 'text-white/80' : 'text-slate-400'}`}>
              ({tab.count})
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}

export default FilterTabs