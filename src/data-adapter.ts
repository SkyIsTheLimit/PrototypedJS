import { FilterFn } from './filterFn';

export interface DataAdapter<T> {
  all(): Promise<T[]>;
  get(filterFn: FilterFn<T>): Promise<T>;
  post(newT: T): Promise<T>;
  put(filterFn: FilterFn<T>, update: Partial<T>): Promise<T>;
  remove(filterFn: FilterFn<T>): Promise<T>;
}

export function createMockDataAdapter<T>(mockData?: T[]): DataAdapter<T> {
  const dataStore = mockData || [];

  return {
    all() {
      return Promise.resolve(dataStore);
    },
    get(filter: FilterFn<T>) {
      const filteredItem = dataStore.find((val) => filter(val));

      return filteredItem
        ? Promise.resolve(filteredItem)
        : Promise.reject('Could not find item');
    },
    post(newT: T) {
      dataStore.push(newT);

      return Promise.resolve(newT);
    },
    put(filter: FilterFn<T>, update: Partial<T>) {
      let itemIndex = -1;
      const filteredItem = dataStore.find((val, index) => {
        itemIndex = index;
        return filter(val);
      });

      if (itemIndex !== -1 && filteredItem) {
        dataStore[itemIndex] = {
          ...dataStore[itemIndex],
          ...update,
        };
        return Promise.resolve(dataStore[itemIndex]);
      } else {
        return Promise.reject('Could not find item');
      }
    },
    remove(filter: FilterFn<T>) {
      let itemIndex = -1;
      const filteredItem = dataStore.find((val, index) => {
        itemIndex = index;
        return filter(val);
      });

      if (itemIndex !== -1 && filteredItem) {
        dataStore.splice(itemIndex, 1);
        return Promise.resolve(filteredItem);
      } else {
        return Promise.reject('Could not find item');
      }
    },
  };
}
