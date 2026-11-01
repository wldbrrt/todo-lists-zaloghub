import type { Todo } from '../../../entities/todo/model/types';
import type { TodoRepository } from '../../api/todoRepository';

const STORAGE_KEY = 'zaloghub.todos';

function isTodoRecord(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.completed === 'boolean' &&
    typeof candidate.createdAt === 'string'
  );
}

export class LocalStorageTodoRepository implements TodoRepository {
  private readonly storage: Storage;

  constructor(storage: Storage = window.localStorage) {
    this.storage = storage;
  }

  async getAll(): Promise<Todo[]> {
    try {
      const rawTodos = this.storage.getItem(STORAGE_KEY);

      if (rawTodos === null) {
        return [];
      }

      const parsedValue: unknown = JSON.parse(rawTodos);

      if (!Array.isArray(parsedValue) || !parsedValue.every(isTodoRecord)) {
        console.warn('Stored todo data is invalid. Resetting storage.');
        return [];
      }

      return parsedValue;
    } catch (error) {
      console.error('Failed to read todos from localStorage.', error);
      return [];
    }
  }

  async saveAll(todos: Todo[]): Promise<void> {
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage.', error);
      throw new Error('Unable to save tasks.', { cause: error });
    }
  }
}
