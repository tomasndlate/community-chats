const CommunitySchema = {
  required: [ '_id', 'owner', 'name', 'threads', 'members', 'startDate' ],
  type: 'object',
  properties: {
    _id: { type: 'integer' },
    name: { type: 'string', example: 'Big Team Community' },
    description: {
      type: 'string',
      example: 'Join the team and help grow your potential'
    },
    startDate: { type: 'string', format: 'date-time' }
  }
}

module.exports = {
  CommunitySchema
}