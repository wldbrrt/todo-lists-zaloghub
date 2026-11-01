import { TODO_FILTER } from './constants';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type TodoFilter = (typeof TODO_FILTER)[keyof typeof TODO_FILTER];
