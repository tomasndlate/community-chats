const getCommunityMethod = {
    summary: 'Get Community by nameId',
    tags: [ 'Communities' ],
    operationId: 'getCommunity',
    parameters: [
        {
        name: 'community',
        in: 'path',
        description: 'community correspond to community nameId',
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
                        $ref: '#/components/schemas/Community'
                    }
                }
            }
        } 
    }
}

module.exports = {
    getCommunityMethod
}