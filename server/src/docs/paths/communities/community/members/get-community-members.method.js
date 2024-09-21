/**
 * @type {Method} | {@link openApiDefinition}
 */
const getCommunityMembersMethod = {
    summary: 'Get community members',
    tags: [ 'Communities' ],
    operationId: 'getCommunityMembers',
    parameters: [
        {
        name: 'nameId',
        in: 'path',
        description: 'NameId of community to get members from',
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
                            $ref: '#/components/schemas/User'
                        }
                    }
                }
            }
        } 
    }
}

module.exports = {
    getCommunityMembersMethod
}