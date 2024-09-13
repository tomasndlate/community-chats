const profileGetMethod = {
    summary: 'Get user self profile',
    tags: [ 'Profile' ],
    operationId: 'getProfile',
    parameters: undefined,
    requestBody: undefined,
    responses: { 
        '200': { 
            description: 'Ok', 
            content: { $ref: '#/components/schemas/User' }
        } },
    security: [ { BearerToken: [] } ]
}

module.exports = {
    profileGetMethod
}