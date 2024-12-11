interface FilterBarProps {
  filter: 'all' | 'unread' | 'read' | 'favorites';
  onFilterChange: (filter: 'all' | 'unread' | 'read' | 'favorites') => void;
}

export function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 p-4 bg-white border-b border-border">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded transition-colors ${
          filter === 'all' 
            ? 'bg-accent text-white' 
            : 'bg-filter-button text-text hover:bg-border'
        }`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('unread')}
        className={`px-4 py-2 rounded transition-colors ${
          filter === 'unread'
            ? 'bg-accent text-white'
            : 'bg-filter-button text-text hover:bg-border'
        }`}
      >
        Unread
      </button>
      <button
        onClick={() => onFilterChange('read')}
        className={`px-4 py-2 rounded transition-colors ${
          filter === 'read'
            ? 'bg-accent text-white'
            : 'bg-filter-button text-text hover:bg-border'
        }`}
      >
        Read
      </button>
      <button
        onClick={() => onFilterChange('favorites')}
        className={`px-4 py-2 rounded transition-colors ${
          filter === 'favorites'
            ? 'bg-accent text-white'
            : 'bg-filter-button text-text hover:bg-border'
        }`}
      >
        Favorites
      </button>
    </div>
  );
}