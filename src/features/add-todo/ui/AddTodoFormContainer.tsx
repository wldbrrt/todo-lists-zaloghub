import { useState } from 'react';
import { AddTodoForm } from './AddTodoForm';

interface AddTodoFormContainerProps {
  onSubmit: (title: string) => Promise<void> | void;
  disabled?: boolean;
}

export function AddTodoFormContainer({
  onSubmit,
  disabled = false,
}: AddTodoFormContainerProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (nextTitle: string) => {
    setTitle(nextTitle);

    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async () => {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setError('Введите название задачи.');
      return;
    }

    setError(null);
    await onSubmit(normalizedTitle);
    setTitle('');
  };

  return (
    <AddTodoForm
      title={title}
      error={error}
      disabled={disabled}
      onTitleChange={handleTitleChange}
      onSubmit={handleSubmit}
    />
  );
}
