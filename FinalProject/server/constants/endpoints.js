const endpoints = {
  users: {
    getAll: '/users',
    getOne: '/users/:id',
    delete: '/users/:id',
    update: '/users/:id',
    post: '/users',
    login: '/login',
    verify: '/verify/:token',


  },
  bloks: {
    getAll: '/bloks',
    getOne: '/bloks/:id',
    delete: '/bloks/:id',
    update: '/bloks/:id',
    post: '/bloks',
  },
  reservations: {
    getAll: '/reservations',
    getOne: '/reservations/:id',
    delete: '/reservations/:id',
    update: '/reservations/:id',
    post: '/reservations',
  },
  orders: {
    getAll: '/orders',
    getOne: '/orders/:id',
    delete: '/orders/:id',
    update: '/orders/:id',
    post: '/orders',
  },
  teams: {
    getAll: '/teams',
    getOne: '/teams/:id',
    delete: '/teams/:id',
    update: '/teams/:id',
    post: '/teams',
  },
  // pizzas: {
  //   getAll: '/pizzas',
  //   getOne: '/pizzas/:id',
  //   delete: '/pizzas/:id',
  //   update: '/pizzas/:id',
  //   post: '/pizzas',
  // },
  menues: {
    getAll: '/menues',
    getOne: '/menues/:id',
    delete: '/menues/:id',
    update: '/menues/:id',
    post: '/menues',
  },
}
module.exports = endpoints;