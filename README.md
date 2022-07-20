# Prototyped [![Node.js CI](https://github.com/SkyIsTheLimit/PrototypedJS/actions/workflows/ci.yml/badge.svg)](https://github.com/SkyIsTheLimit/PrototypedJS/actions/workflows/ci.yml)

A library to create mock APIs for UI prototypes.

## Installing

```bash
npm install @prototypedjs/core
```

OR

```bash
yarn add @prototypedjs/core
```

## Usage

### Initializing

```ts
import { createApi } from '@prototypedjs/core';

interface User {
  id: string;
  name: string;
  email: string;
}

const userApi = createApi<User>();
```

The <code>userApi</code> object can be used as an abstraction for the backend. It has methods that use the Promise API to handle data.

### Using the API

```ts
const allUsers = await userApi.all();

const newUser = await userApi.post({
  id: '1',
  name: 'John Doe',
  email: 'john.doe@iamadonut.com',
});

// This is a custom filter function for the User interface.
const getUser = (id: string) => (user: User) => user.id === id;

const oneUser = await userApi.get(getUser('1'));

const updateUser = await userApi.put(getUser('1'), { name: 'Jane Doe' });

const deletedUser = await userApi.remove(getUser('1'));
```

### Working with Initial Mock Data

If you have initial mock data that you want to use, it can be passed in while creating the API object.

```ts
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@iamadonut.com',
  },
];

const userApi = createApi<User>(mockUsers);
```

The API object will add the mock data to its internal storage.

```ts
const users = await userApi.all(); // users.length = 1
```
