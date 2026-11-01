import type { FormEvent } from 'react';
import { UI_TEXT } from '../../../shared/constants/uiText';

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
        {UI_TEXT.addTodo.inputLabel}
      </label>
      <input
        id="todo-title-input"
        type="text"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        placeholder={UI_TEXT.addTodo.placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'todo-input-error' : undefined}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !title.trim()}
        aria-label={UI_TEXT.addTodo.addButtonLabel}
      >
        {UI_TEXT.addTodo.addButtonText}
      </button>
      {error ? (
        <p id="todo-input-error" className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
