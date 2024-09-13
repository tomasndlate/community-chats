require('./openapi-jsdoc');
const { AuthToken } = require("./components/schemas/AuthToken.schema");
const { CommunitySchema } = require("./components/schemas/Community.schema");
const { ErrorResponse } = require('./components/schemas/ErrorResponse.schema');
const { MessageSchema } = require("./components/schemas/Message.schema");
const { ThreadSchema } = require("./components/schemas/Thread.schema");
const { UserSchema } = require("./components/schemas/User.schema");
const { BearerToken } = require('./components/securitySchemes/BearerToken');
const { authPath } = require('./paths/auth.path');
const { communitiesPath } = require("./paths/communities.path");
const { profilePath } = require("./paths/profile.path");
const { usersPath } = require("./paths/users.path");
const { devServer } = require("./servers/dev.server");
const { prodServer } = require("./servers/prod.server");
const { authTag } = require("./tags/auth.tag");
const { communitiesTag } = require('./tags/communities.tag');
const { profileTag } = require('./tags/profile.tag');

/**
 * @type {OpenApiDefinition} | {@link openApiDefinition}
 */
const openApiDefinition = {
  openapi: "3.0.0",
  info: {
    title: 'Community Thread - API',
    version: '1.0.0',
    description: 'Documentation for Community Thread - API',
    license: { name: 'MIT', url: 'https://spdx.org/licenses/MIT.html' },
    contact: {
      name: 'Tomas Ndlate',
      url: 'https://www.linkedin.com/in/tomasndlate/'
    }
  },
  externalDocs: {
    url: 'https://www.example.com', 
    description: 'External docs linkzin' 
  },
  servers: [
    devServer,
    prodServer
  ],
  tags: [
    authTag,
    profileTag,
    communitiesTag,
  ],
  paths: {
    ...authPath,
    ...profilePath,
    ...communitiesPath,
    ...usersPath
  },
  components: {
    schemas: {
      User: UserSchema,
      Community: CommunitySchema,
      Thread: ThreadSchema,
      Message: MessageSchema,
      AuthToken: AuthToken,
      ErrorResponse: ErrorResponse
    },
    requestBodies: {},
    securitySchemes: {
      BearerToken: BearerToken
    }
  }
}

module.exports = {
  openApiDefinition
}