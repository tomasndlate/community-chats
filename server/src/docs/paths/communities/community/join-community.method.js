/**
 * @type {Method} | {@link openApiDefinition}
 */
const joinCommunityMethod = {
    summary: 'User join a community',
    description: 'User add himself to the community',
    operationId: 'joinCommunity',
    tags: ['Communities'],
    responses: {
        '200': {
            description: 'Ok',
            content: {
                'application/json': {
                    schema: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

module.exports = {
    joinCommunityMethod
}