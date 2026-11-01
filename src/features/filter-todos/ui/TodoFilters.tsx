import type { TodoFilter } from '../../../entities/todo/model/types';

interface TodoFiltersProps {
  filter: TodoFilter;
  onChange: (value: TodoFilter) => void;
}

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TodoFilters({ filter, onChange }: TodoFiltersProps) {
  return (
    <div className="filter-group" aria-label="Todo filters">
      {FILTERS.map(({ value, label }) => {
        const isActive = filter === value;

        return (
          <button
            key={value}
            type="button"
            className={isActive ? 'filter-button active' : 'filter-button'}
            onClick={() => onChange(value)}
            aria-pressed={isActive}
            aria-label={`Filter tasks: ${label}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
