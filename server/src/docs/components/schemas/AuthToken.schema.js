const AuthToken = {
  required: [],
  type: 'object',
  properties: {
    accessToken: { type: 'string', example: 'access-token-value'}
  }
}

module.exports = {
  AuthToken
}