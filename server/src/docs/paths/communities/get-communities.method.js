/**
 * @type {Method} | {@link openApiDefinition}
 */
const getCommunitiesMethod = {
    summary: 'Get all the communities',
    tags: [ 'Communities' ],
    operationId: 'getCommunities',
    parameters: [
        {
        name: 'name',
        in: 'query',
        description: 'Name of communities to search',
        required: false,
        schema: { type: 'string' }
        },
        {
        name: 'page',
        in: 'query',
        description: 'Page of the communities searched',
        required: false,
        schema: { type: 'integer' }
        },
        {
        name: 'limit',
        in: 'query',
        description: 'Limit of communities per page',
        required: false,
        schema: { type: 'integer' }
        }
    ],
    responses: { 
        '200': { 
            description: '', 
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Community'
                    }
                }
            }
        } 
    }
}

module.exports = {
    getCommunitiesMethod
}