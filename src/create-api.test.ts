import { createApi } from './create-api';
import { createMockDataAdapter, DataAdapter } from './data-adapter';
import { MockApi } from './mock-api';

interface User {
  name: string;
  email: string;
}

describe('PrototypedJS', () => {
  let mockData: User[], adapter: DataAdapter<User>;

  beforeEach(() => {
    mockData = [
      {
        name: 'Foo',
        email: 'Bar',
      },
    ];
    adapter = createMockDataAdapter(mockData);
  });

  describe('Default API object', () => {
    let userApi: MockApi<User>,
      filterFn = (email: string) => (user: User) => user.email === email;

    beforeEach(() => {
      userApi = createApi<User>();
    });

    test('Create default API object', () => {
      expect(userApi).toBeDefined();
    });

    test('Return all data', async () => {
      const allData = await userApi.all();

      expect(allData.length).toBe(0);
    });

    test('Create user', async () => {
      const newUser = await userApi.post({
        name: 'John Doe',
        email: 'john.doe@iamadonut.com',
      });

      expect('');
    });

    test('Get user by filter fn', async () => {
      expect.assertions(1);

      try {
        const user = await userApi.get(filterFn('Bar'));
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    test('Get unknown user', async () => {
      expect.assertions(1);
      try {
        await userApi.get(filterFn('NotFound'));
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    test('Update user', async () => {
      expect.assertions(1);
      try {
        const user = await userApi.put(filterFn('Bar'), {
          name: 'Jane',
        });
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    test('Update unknown user', async () => {
      expect.assertions(1);
      try {
        await userApi.put(filterFn('NotFound'), {
          name: 'Not Happening',
        });
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    test('Remove user', async () => {
      expect.assertions(2);

      try {
        await userApi.remove(filterFn('Bar'));
      } catch (ex) {
        expect(ex).toBeDefined();
      }

      const allUsers = await userApi.all();

      expect(allUsers.length).toBe(0);
    });

    test('Remove unknown user', async () => {
      expect.assertions(2);
      try {
        await userApi.remove(filterFn('NotFound'));
      } catch (ex) {
        expect(ex).toBeDefined();
      }

      const allUsers = await userApi.all();

      expect(allUsers.length).toBe(0);
    });
  });

  describe('API object with empty adapter', () => {
    let userApi: MockApi<User>,
      filterFn = (email: string) => (user: User) => user.email === email;

    beforeEach(() => {
      adapter = createMockDataAdapter();
      userApi = createApi<User>(adapter);
    });

    test('Create default API object', () => {
      expect(userApi).toBeDefined();
    });

    test('Return all data', async () => {
      const allData = await userApi.all();

      expect(allData.length).toBe(0);
    });

    test('Create user', async () => {
      const newUser = await userApi.post({
        name: 'John Doe',
        email: 'john.doe@iamadonut.com',
      });

      expect('');
    });

    test('Get user by filter fn', async () => {
      expect.assertions(1);

      try {
        const user = await userApi.get(filterFn('Bar'));
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    test('Get unknown user', async () => {
      expect.assertions(1);
      try {
        await userApi.get(filterFn('NotFound'));
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    test('Update user', async () => {
      expect.assertions(1);
      try {
        const user = await userApi.put(filterFn('Bar'), {
          name: 'Jane',
        });
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    test('Update unknown user', async () => {
      expect.assertions(1);
      try {
        await userApi.put(filterFn('NotFound'), {
          name: 'Not Happening',
        });
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    test('Remove user', async () => {
      expect.assertions(2);

      try {
        await userApi.remove(filterFn('Bar'));
      } catch (ex) {
        expect(ex).toBeDefined();
      }

      const allUsers = await userApi.all();

      expect(allUsers.length).toBe(0);
    });

    test('Remove unknown user', async () => {
      expect.assertions(2);
      try {
        await userApi.remove(filterFn('NotFound'));
      } catch (ex) {
        expect(ex).toBeDefined();
      }

      const allUsers = await userApi.all();

      expect(allUsers.length).toBe(0);
    });
  });

  describe('API Object with Mock Data', () => {
    let userApi: MockApi<User>,
      filterFn = (email: string) => (user: User) => user.email === email;

    beforeEach(() => {
      userApi = createApi<User>(mockData);
    });

    test('Create API object with initial mock data', () => {
      expect(userApi).toBeDefined();
    });

    test('Return all data', async () => {
      const allData = await userApi.all();

      expect(allData.length).toBe(1);
    });

    test('Create user', async () => {
      const newUser = await userApi.post({
        name: 'John Doe',
        email: 'john.doe@iamadonut.com',
      });

      expect('');
    });

    test('Get user by filter fn', async () => {
      const user = await userApi.get(filterFn('Bar'));

      expect(user).toBeDefined();
      expect(user.name).toBe('Foo');
    });

    test('Get unknown user', async () => {
      expect.assertions(1);
      try {
        await userApi.get(filterFn('NotFound'));
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    test('Update user', async () => {
      const user = await userApi.put(filterFn('Bar'), {
        name: 'Jane',
      });

      expect(user).toBeDefined();
      expect(user.name).toBe('Jane');
    });

    test('Update unknown user', async () => {
      expect.assertions(1);
      try {
        await userApi.put(filterFn('NotFound'), {
          name: 'Not Happening',
        });
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    test('Remove user', async () => {
      await userApi.remove(filterFn('Bar'));

      const allUsers = await userApi.all();

      expect(allUsers.length).toBe(0);
    });

    test('Remove unknown user', async () => {
      expect.assertions(2);
      try {
        await userApi.remove(filterFn('NotFound'));
      } catch (ex) {
        expect(ex).toBeDefined();
      }

      const allUsers = await userApi.all();

      expect(allUsers.length).toBe(1);
    });
  });

  describe('API Object with Data Adapter', () => {
    let userApi: MockApi<User>,
      filterFn = (email: string) => (user: User) => user.email === email;

    beforeEach(() => {
      adapter = createMockDataAdapter(mockData);
      userApi = createApi<User>(adapter);
    });

    test('Create API object with data adapter', () => {
      expect(userApi).toBeDefined();
    });

    test('Return all data', async () => {
      const allData = await userApi.all();

      expect(allData.length).toBe(1);
    });

    test('Create user', async () => {
      const newUser = await userApi.post({
        name: 'John Doe',
        email: 'john.doe@iamadonut.com',
      });

      expect('');
    });

    test('Get user by filter fn', async () => {
      const user = await userApi.get(filterFn('Bar'));

      expect(user).toBeDefined();
      expect(user.name).toBe('Foo');
    });

    test('Get unknown user', async () => {
      expect.assertions(1);
      try {
        await userApi.get(filterFn('NotFound'));
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    test('Update user', async () => {
      const user = await userApi.put(filterFn('Bar'), {
        name: 'Jane',
      });

      expect(user).toBeDefined();
      expect(user.name).toBe('Jane');
    });

    test('Update unknown user', async () => {
      expect.assertions(1);
      try {
        await userApi.put(filterFn('NotFound'), {
          name: 'Not Happening',
        });
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    test('Remove user', async () => {
      await userApi.remove(filterFn('Bar'));

      const allUsers = await userApi.all();

      expect(allUsers.length).toBe(0);
    });

    test('Remove unknown user', async () => {
      expect.assertions(2);
      try {
        await userApi.remove(filterFn('NotFound'));
      } catch (ex) {
        expect(ex).toBeDefined();
      }

      const allUsers = await userApi.all();

      expect(allUsers.length).toBe(1);
    });
  });
});
