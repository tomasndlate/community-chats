/**
 * @type {Method} | {@link openApiDefinition}
 */
const getCommunityThreadsMethod = {
    summary: 'Get community threads',
    tags: [ 'Communities' ],
    operationId: 'getCommunityThreads',
    parameters: [
        {
        name: 'nameId',
        in: 'path',
        description: 'NameId of community to get threads from',
        required: true,
        schema: { type: 'string' }
        },
    ],
    responses: { 
        '200': { 
            description: '', 
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Thread'
                        }
                    }
                }
            }
        } 
    }
}

module.exports = {
    getCommunityThreadsMethod
}