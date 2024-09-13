const UserSchema = {
  required: [ '_id', 'email', 'username', 'name' ],
  type: 'object',
  properties: {
    _id: { type: 'string' },
    googleId: { type: 'string' },
    email: { type: 'string', example: 'user@gmail.com' },
    username: { type: 'string', example: 'user123' },
    password: { type: 'string', example: 'example123' },
    name: { type: 'string', example: 'User Three' }
  }
}

const UserApiResponse = {
  required: [ '_id', 'email', 'username', 'name' ],
  type: 'object',
  properties: {
    _id: { type: 'string' },
    googleId: { type: 'string' },
    email: { type: 'string', example: 'user@gmail.com' },
    username: { type: 'string', example: 'user123' },
    name: { type: 'string', example: 'User Three' }
  }
}

const UserApiRequest = {
  required: [ 'email', 'username', 'password', 'name' ],
  type: 'object',
  properties: {
    email: { type: 'string', example: 'user@gmail.com' },
    username: { type: 'string', example: 'user123' },
    password: { type: 'string', example: 'example123'},
    name: { type: 'string', example: 'User Three' }
  }
}

const UserLogInApiRequest = {
  required: [ 'email', 'password' ],
  type: 'object',
  properties: {
    email: { type: 'string', example: 'user@gmail.com' },
    password: { type: 'string', example: 'example123'}
  }
}

module.exports = {
  UserSchema,
  UserApiResponse,
  UserApiRequest,
  UserLogInApiRequest
}