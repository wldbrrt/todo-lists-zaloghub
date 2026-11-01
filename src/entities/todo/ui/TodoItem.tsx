import type { Todo } from '../model/types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const statusLabel = todo.completed ? 'Mark as active' : 'Mark as completed';

  return (
    <li className={todo.completed ? 'todo-item completed' : 'todo-item'}>
      <button
        type="button"
        className="todo-toggle"
        onClick={() => onToggle(todo.id)}
        aria-label={`${statusLabel}: ${todo.title}`}
        aria-pressed={todo.completed}
      >
        {todo.completed ? '✓' : '○'}
      </button>

      <span className="todo-title">{todo.title}</span>

      <button
        type="button"
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete task: ${todo.title}`}
      >
        Delete
      </button>
    </li>
  );
}
