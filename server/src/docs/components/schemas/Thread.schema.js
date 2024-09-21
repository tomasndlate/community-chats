const ThreadSchema = {
  required: [ '_id' ],
  type: 'object',
  properties: {
    _id: { type: 'integer' },
    community: { '$ref': '#/components/schemas/Community/properties/_id' },
    nameId: { type: 'string' },
    name: { type: 'string' },
    messages: {
      type: 'array',
      '$ref': '#/components/schemas/Message/properties/_id'
    },
    startDate: { type: 'integer' }
  }
}

module.exports = {
  ThreadSchema
}