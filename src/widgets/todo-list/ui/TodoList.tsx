import type { Todo } from '../../../entities/todo/model/types';
import { UI_TEXT } from '../../../shared/constants/uiText';
import { TodoItem } from '../../../entities/todo/ui/TodoItem';
import { EmptyState } from '../../../shared/ui/EmptyState';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <EmptyState
        title={UI_TEXT.emptyState.title}
        description={UI_TEXT.emptyState.description}
      />
    );
  }

  return (
    <ul className="todo-list" aria-live="polite">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
