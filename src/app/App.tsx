import { AddTodoFormContainer } from '../features/add-todo/ui/AddTodoFormContainer';
import { TodoFilters } from '../features/filter-todos/ui/TodoFilters';
import { UI_TEXT } from '../shared/constants/uiText';
import { LocalStorageTodoRepository } from '../shared/lib/storage/localStorageTodoRepository';
import { TodoList } from '../widgets/todo-list/ui/TodoList';
import { useTodos } from '../widgets/todo-list/model/useTodos';

const repository = new LocalStorageTodoRepository();

export function App() {
  const { filteredTodos, filter, isLoading, error, setFilter, addTodo, toggleTodo, deleteTodo } =
    useTodos(repository);

  return (
    <main className="app-shell">
      <section className="todo-panel" aria-label={UI_TEXT.app.sectionLabel}>
        <header className="todo-header">
          <p className="eyebrow">{UI_TEXT.app.eyebrow}</p>
          <h1>{UI_TEXT.app.title}</h1>
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
            {UI_TEXT.app.loading}
          </p>
        ) : (
          <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}
      </section>
    </main>
  );
}
