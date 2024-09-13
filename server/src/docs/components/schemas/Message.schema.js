const MessageSchema = {
  required: [ '_id' ],
  type: 'object',
  properties: {
    _id: { type: 'integer' },
    thread: { '$ref': '#/components/schemas/Thread/properties/_id' },
    sender: { type: 'string' },
    content: { type: 'string' },
    startDate: { type: 'integer' }
  }
}

module.exports = {
  MessageSchema
}