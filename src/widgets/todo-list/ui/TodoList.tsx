import type { Todo } from '../../../entities/todo/model/types';
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
        title="No tasks yet"
        description="Add your first task to get started."
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
