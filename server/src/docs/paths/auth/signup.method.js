const { AuthToken } = require("../../components/schemas/AuthToken.schema");
const { ErrorResponse } = require("../../components/schemas/ErrorResponse.schema");
const { UserApiResponse, UserApiRequest } = require("../../components/schemas/User.schema");

/**
 * @type {Method} | {@link openApiDefinition}
 */
const postSignUpMethod = {
    summary: 'Sign up',
    tags: [ 'Auth' ],
    operationId: 'postSignUp',
    requestBody: {
        description: 'Sign up with a new user',
        content: { 
            'application/json': {
                schema: UserApiRequest
            }
        }
    },
    responses: { 
        '201': { 
            description: 'Ok', 
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            User: UserApiResponse,
                            AuthToken: AuthToken
                        }
                    }
                }
            }
        },
        '400': { 
            description: 'Bad Request', 
            content: {
                'application/json': {
                    schema: ErrorResponse
                }
            }
        },
        '409': { 
            description: 'Conflict', 
            content: {
                'application/json': {
                    schema: ErrorResponse
                }
            }
        },
        '500': { 
            description: 'Internal Server Error', 
            content: {
                'application/json': {
                    schema: ErrorResponse
                }
            }
        },
    }
}

module.exports = {
    postSignUpMethod
}