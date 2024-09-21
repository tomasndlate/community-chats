/**
 * @type {Method} | {@link openApiDefinition}
 */
const postCommunityMembersMethod = {
    summary: 'Add members to a community',
    tags: [ 'Communities' ],
    operationId: 'postCommunityMembers',
    parameters: [
        {
        name: 'nameId',
        in: 'path',
        description: 'NameId of community to add members',
        required: true,
        schema: { type: 'string' }
        },
    ],
    requestBody: {
        description: '',
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        $ref: 'string'
                    }
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
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                }
            }
        } 
    }
}

module.exports = {
    postCommunityMembersMethod
}