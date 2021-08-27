import User from '../../users/entities/user.entity';

export const mockedUser: User = {
  id: 1,
  email: 'user@email.com',
  name: 'John',
  password: 'hash',
  role: 'user',
};

export const mockedAdmin: User = {
  id: 2,
  email: 'user@email.com',
  name: 'John',
  password: 'hash',
  role: 'admin',
};
