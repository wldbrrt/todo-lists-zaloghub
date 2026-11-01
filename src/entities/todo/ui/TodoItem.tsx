import type { Todo } from '../model/types';
import { UI_TEXT } from '../../../shared/constants/uiText';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const statusLabel = todo.completed
    ? UI_TEXT.todoItem.markActive
    : UI_TEXT.todoItem.markCompleted;

  return (
    <li className={todo.completed ? 'todo-item completed' : 'todo-item'}>
      <button
        type="button"
        className="todo-toggle"
        onClick={() => onToggle(todo.id)}
        aria-label={`${statusLabel}: ${todo.title}`}
        aria-pressed={todo.completed}
      >
        {todo.completed ? UI_TEXT.todoItem.completedMark : UI_TEXT.todoItem.activeMark}
      </button>

      <span className="todo-title">{todo.title}</span>

      <button
        type="button"
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`${UI_TEXT.todoItem.deleteAriaLabelPrefix}${todo.title}`}
      >
        {UI_TEXT.todoItem.deleteButtonText}
      </button>
    </li>
  );
}
