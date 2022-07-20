import { FilterFn } from './filterFn';

export interface MockApi<T> {
  all(): Promise<T[]>;
  get(filterFn: FilterFn<T>): Promise<T>;
  post(newT: T): Promise<T>;
  put(filterFn: FilterFn<T>, update: Partial<T>): Promise<T>;
  remove(filterFn: FilterFn<T>): Promise<T>;
}
