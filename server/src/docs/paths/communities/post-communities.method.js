/**
 * @type {Method} | {@link openApiDefinition}
 */
const postCommunitiesMethod = {
    summary: 'Create a new Community',
    tags: [ 'Communities' ],
    operationId: 'postCommunity',
    requestBody: {
        description: '',
        required: '',
        content: { 
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Community'
                }
            }
        }
    },
    responses: { 
        '200': { 
            description: 'Ok', 
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Community'
                    }
                }
            }
        } 
        },
    // security: [ { BearerToken: [] } ]
}

module.exports = {
    postCommunitiesMethod
}