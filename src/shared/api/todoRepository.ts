import type { Todo } from '../../entities/todo/model/types';

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  saveAll(todos: Todo[]): Promise<void>;
}
