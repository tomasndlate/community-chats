const { AuthToken } = require("../../components/schemas/AuthToken.schema");
const { ErrorResponse } = require("../../components/schemas/ErrorResponse.schema");
const { UserApiResponse, UserApiRequest, UserLogInApiRequest } = require("../../components/schemas/User.schema");

/**
 * @type {Method} | {@link openApiDefinition}
 */
const postLogInMethod = {
    summary: 'Log in',
    tags: [ 'Auth' ],
    operationId: 'postLogIn',
    requestBody: {
        description: 'Login with user credentials (email & password)',
        content: { 
            'application/json': {
                schema: UserLogInApiRequest
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
        '401': { 
            description: 'Unauthorized', 
            content: {
                'application/json': {
                    schema: ErrorResponse
                }
            }
        },
        '404': { 
            description: 'Not found', 
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
    postLogInMethod
}