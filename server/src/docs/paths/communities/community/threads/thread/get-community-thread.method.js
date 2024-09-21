/**
 * @type {Method} | {@link openApiDefinition}
 */
const getCommunityThreadMethod = {
    summary: 'Get Thread by nameId',
    tags: [ 'Communities' ],
    operationId: 'getCommunityThread',
    parameters: [
        {
            name: 'nameId',
            in: 'path',
            description: 'community correspond to community nameId',
            required: true,
            schema: {
                type: 'string'
            }
        },
        {
            name: 'threadId',
            in: 'path',
            description: 'threadId correspond to thread nameId',
            required: true,
            schema: {
                type: 'string'
            }
        }
    ],
    responses: { 
        '200': { 
            description: 'Ok', 
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Thread'
                    }
                }
            }
        } 
    }
}

module.exports = {
    getCommunityThreadMethod
}