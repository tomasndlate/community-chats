const ErrorDetails = {
    type: 'object',
    properties: {
        errorCode:{
            type: 'string',
            example: 'SPECIFIC_ERROR'
        },
        message:{
            type: 'string',
            example: 'Specific internal error'
        }
    }
}

const ErrorResponse = {
    required: [ 'status', 'code', 'message' ],
    type: 'object',
    properties: {
        status: { type: 'string', example: 'error' },
        code: { type: 'integer', example: '500' },
        message: { type: 'string', example: 'Internal server error' },
        details: {
            type: 'array',
            items: ErrorDetails
        }
    }
}


module.exports = {
  ErrorResponse
}