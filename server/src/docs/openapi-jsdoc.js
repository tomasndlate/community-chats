/** Open API Definition
 * @typedef {Object} OpenApiDefinition
 * @property {string} openapi
 * @property {Info} info - {@link Info}
 * @property {ExternalDocs} externalDocs - {@link ExternalDocs}
 * @property {Server[]} servers - {@link Server}
 * @property {Tag[]} tags - {@link Tag}
 * @property {Paths} paths 
 * @property {} paths.methodEnum- <{@link methodPathEnum}, {@link Path}>
 * @property {Components} components - {@link Components}
 */

/** Info Structure for Open API Definition
 * @typedef {Object} Info
 * @property {string} title
 * @property {string} version
 * @property {string} description
 * @property {Object} license
 * @property {string} license.name
 * @property {string} license.url
 * @property {Object} contact
 * @property {string} contact.name
 * @property {string} contact.url
 */

/** ExternalDocs Structure for Open API Definition 
 * @typedef {Object} ExternalDocs
 * @property {string} url
 * @property {string} description
 */

/** Server Structure for Servers Definition
 * @typedef {Object} Server
 * @property {string} url
 * @property {string} description
 * @property {boolean} [active]
 */

/** Tag Structure for Tags Definition
 * @typedef {Object} Tag
 * @property {string} name
 * @property {string} description
 * @property {ExternalDocs} externalDocs - {@link ExternalDocs}
 */

/** Paths for Open API Definition
 * @typedef {Object<string,Methods>} Paths
 */

/**
 * @typedef {Object} Methods
 * @property {Method} get
 * @property {Method} post
 * @property {Method} put
 * @property {Method} delete
*/

/** Path for Open API Definition
 * @typedef {Object} Method
 * @property {string} summary
 * @property {string} description
 * @property {string} operationId
 * @property {string[]} tags
 * @property {Parameter[]} parameters {@link Parameter}
 * @property {RequestBody} requestBody {@link RequestBody}
 * @property {Object<string, Response_OpenAPI>} responses - <'application/json', {@link Response_OpenAPI}>
 * @property {SecurityScheme} [security] - {@link SecurityScheme}
 */

/**
 * @typedef {string} ContentType - 200 | 201 | 400 | 500
*/

/** Parameter Structure for Path Definition
 * @typedef {Object} Parameter
 * @property {string} name
 * @property {string} in
 * @property {string} description
 * @property {boolean} required
 * @property {Object} schema
 * @property {string} [schema.$ref]
 * @property {string} [schema.type]
 * @property {string} [schema.format]
 */

/** Schema Structure for Components Definition
 * @typedef {Object} Schema
 * @property {string[]} required
 * @property {string} type
 * @property {Object<string,SchemaProperty>} properties - <Schema Name, {@link SchemaProperty}>
 * 
 * @typedef {Object} SchemaProperty
 * @property {string} type
 * @property {string} format
 * @property {string} example
 * @property {string} $ref
 */

/** Response_OpenAPI Structure for Path Definition
 * @typedef {Object} Response_OpenAPI
 * @property {string} description
 * @property {Object<contentTypeEnum, Content>} content - <{@link contentTypeEnum}, {@link Content}>
 */ /** 
 * @typedef {string} responseTypeEnum - 200 | 201 | 400 | 500 | ...
 */

/** ContentBody Structure for Components Definition
 * @typedef {Object} RequestBody
 * @property {string} description
 * @property {boolean} required
 * @property {Object<contentTypeEnum, Content>} content - <{@link contentTypeEnum}, {@link Content}>
 */

 /** Content Structure for Response_OpenAPI/ResquestBody Definition
 * @typedef {Object} Content
 * @property {Object} schema - The schema definition for the content type.
 * @property {string} schema.type - The type of the content.
 * @property {Object} [schema.items] - Only used if type is 'array'.
 * @property {string} schema.items.$ref - Reference for some schema as an 'array' item.
 * @property {string} [schema.$ref] - Reference for some schema
 */ /** 
 * @typedef {string} contentTypeEnum - application/json | application/xml | ...
 */

/** SecurityScheme for Components Definition
 * @typedef {Object} SecurityScheme
 * @property {string} type - For bearer -> "http".
 * @property {string} scheme - For bearer -> "bearer".
 * @property {string} [bearerFormat] - (optional, e.g., "JWT").
 * @property {string} [description]
 */

/** Components Structure for Open API Definition
 * @typedef {Object} Components
 * @property {Object<string,Schema>} schemas - < Schema Name, {@link Schema}>
 * @property {Object<string,RequestBody>} requestBodies - < RequestBody Name, {@link RequestBody}>
 * @property {Object<string,SecurityScheme>} securitySchemes - < SecurityScheme Name, {@link SecurityScheme}>
 */

