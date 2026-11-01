import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Todo, TodoFilter } from '../../../entities/todo/model/types';
import type { TodoRepository } from '../../../shared/api/todoRepository';

export interface UseTodosResult {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: TodoFilter;
  isLoading: boolean;
  error: string | null;
  setFilter: (filter: TodoFilter) => void;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export function useTodos(repository: TodoRepository): UseTodosResult {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasHydratedRef = useRef(false);
  const saveQueueRef = useRef<Promise<void>>(Promise.resolve());

  const enqueueSave = useCallback(
    (nextTodos: Todo[]) => {
      if (!hasHydratedRef.current) {
        return;
      }

      const runSave = async () => {
        try {
          await repository.saveAll(nextTodos);
          setError(null);
        } catch (saveError) {
          console.error('Failed to save todos', saveError);
          setError('Unable to save tasks.');
        }
      };

      saveQueueRef.current = saveQueueRef.current
        .catch(() => undefined)
        .then(runSave);
    },
    [repository],
  );

  const loadTodos = useCallback(async () => {
    setIsLoading(true);

    try {
      const loadedTodos = await repository.getAll();
      setTodos(loadedTodos);
      hasHydratedRef.current = true;
      setError(null);
    } catch (loadError) {
      console.error('Failed to load todos', loadError);
      hasHydratedRef.current = true;
      setError('Unable to load tasks.');
    } finally {
      setIsLoading(false);
    }
  }, [repository]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void loadTodos();
    }, 0);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [loadTodos]);

  const addTodo = useCallback(
    async (title: string) => {
      const normalizedTitle = title.trim();

      if (!normalizedTitle) {
        setError('Please enter a task title.');
        return;
      }

      setError(null);

      setTodos((currentTodos) => {
        const nextTodos = [
          {
            id: crypto.randomUUID(),
            title: normalizedTitle,
            completed: false,
            createdAt: new Date().toISOString(),
          },
          ...currentTodos,
        ];

        enqueueSave(nextTodos);
        return nextTodos;
      });
    },
    [enqueueSave],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((currentTodos) => {
        const nextTodos = currentTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        );

        enqueueSave(nextTodos);
        return nextTodos;
      });
    },
    [enqueueSave],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((currentTodos) => {
        const nextTodos = currentTodos.filter((todo) => todo.id !== id);

        enqueueSave(nextTodos);
        return nextTodos;
      });
    },
    [enqueueSave],
  );

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'all':
      default:
        return todos;
    }
  }, [filter, todos]);

  return {
    todos,
    filteredTodos,
    filter,
    isLoading,
    error,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
