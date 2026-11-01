import type { TodoFilter } from '../../../entities/todo/model/types';
import { TODO_FILTER } from '../../../entities/todo/model/constants';
import { UI_TEXT } from '../../../shared/constants/uiText';

interface TodoFiltersProps {
  filter: TodoFilter;
  onChange: (value: TodoFilter) => void;
}

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: TODO_FILTER.ALL, label: UI_TEXT.filters.all },
  { value: TODO_FILTER.ACTIVE, label: UI_TEXT.filters.active },
  { value: TODO_FILTER.COMPLETED, label: UI_TEXT.filters.completed },
];

export function TodoFilters({ filter, onChange }: TodoFiltersProps) {
  return (
    <div className="filter-group" aria-label={UI_TEXT.filters.groupLabel}>
      {FILTERS.map(({ value, label }) => {
        const isActive = filter === value;

        return (
          <button
            key={value}
            type="button"
            className={isActive ? 'filter-button active' : 'filter-button'}
            onClick={() => onChange(value)}
            aria-pressed={isActive}
            aria-label={`${UI_TEXT.filters.ariaLabelPrefix}${label}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
