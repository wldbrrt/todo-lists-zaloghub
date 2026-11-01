import type { FormEvent } from 'react';

interface AddTodoFormProps {
  title: string;
  error: string | null;
  disabled: boolean;
  onTitleChange: (title: string) => void;
  onSubmit: () => void;
}

export function AddTodoForm({
  title,
  error,
  disabled,
  onTitleChange,
  onSubmit,
}: AddTodoFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todo-title-input">
        New task title
      </label>
      <input
        id="todo-title-input"
        type="text"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        placeholder="What needs to be done?"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'todo-input-error' : undefined}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !title.trim()} aria-label="Add task">
        Add
      </button>
      {error ? (
        <p id="todo-input-error" className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
