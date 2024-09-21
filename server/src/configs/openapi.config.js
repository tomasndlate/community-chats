const swaggerUI = require('swagger-ui-express');
const { openApiDefinition } = require('../docs/openapi');

const initOpenAPI = (app, port) => {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(openApiDefinition));
  console.log("Swagger api docs running on port:", port);
}

module.exports = {
  initOpenAPI
}
