import { createMockDataAdapter, DataAdapter } from './data-adapter';
import { MockApi } from './mock-api';

export function createApi<T>(): MockApi<T>;
export function createApi<T>(mockData: T[]): MockApi<T>;
export function createApi<T>(adapter: DataAdapter<T>): MockApi<T>;
export function createApi<T>(
  mockDataOrAdapter?: T[] | DataAdapter<T>
): MockApi<T> {
  if (!mockDataOrAdapter) {
    return createApi(createMockDataAdapter([] as T[]));
  }
  if (Array.isArray(mockDataOrAdapter)) {
    return createApi(createMockDataAdapter(mockDataOrAdapter));
  } else {
    return {
      all: mockDataOrAdapter.all.bind(mockDataOrAdapter),
      post: mockDataOrAdapter.post.bind(mockDataOrAdapter),
      get: mockDataOrAdapter.get.bind(mockDataOrAdapter),
      put: mockDataOrAdapter.put.bind(mockDataOrAdapter),
      remove: mockDataOrAdapter.remove.bind(mockDataOrAdapter),
    } as MockApi<T>;
  }
}
