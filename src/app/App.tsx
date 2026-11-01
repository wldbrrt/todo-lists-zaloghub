import { AddTodoFormContainer } from '../features/add-todo/ui/AddTodoFormContainer';
import { TodoFilters } from '../features/filter-todos/ui/TodoFilters';
import { LocalStorageTodoRepository } from '../shared/lib/storage/localStorageTodoRepository';
import { TodoList } from '../widgets/todo-list/ui/TodoList';
import { useTodos } from '../widgets/todo-list/model/useTodos';

const repository = new LocalStorageTodoRepository();

export function App() {
  const { filteredTodos, filter, isLoading, error, setFilter, addTodo, toggleTodo, deleteTodo } =
    useTodos(repository);

  return (
    <main className="app-shell">
      <section className="todo-panel" aria-label="Todo list">
        <header className="todo-header">
          <p className="eyebrow">Tasks</p>
          <h1>Todo List</h1>
        </header>

        <AddTodoFormContainer onSubmit={addTodo} disabled={isLoading} />

        {error ? (
          <p className="status-error" role="alert">
            {error}
          </p>
        ) : null}

        <TodoFilters filter={filter} onChange={setFilter} />

        {isLoading ? (
          <p className="status-message" aria-live="polite">
            Loading tasks...
          </p>
        ) : (
          <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}
      </section>
    </main>
  );
}
