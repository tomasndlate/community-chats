const ApiResponse = require('../../responses/ApiResponse');
const User = require('../../core/models/User');
const authService = require('../../core/services/auth.service');
const { CodeResponse } = require('../../responses/CodeResponse.enum');
const { RequestErrors } = require('../../responses/errors/RequestErrors.enum');
// const {InternalServerError} = require('../../errors/InternalServer.error');
// const { BadRequestError } = require('../../errors/BadRequest.error');
// const { NotFoundError } = require('../../errors/NotFound.error');
// const { UnauthorizedError } = require('../../errors/Unauthorized.error');
const { comparePassword } = require('../../core/utils/passwordUtils');
// const { OkResponse } = require('../../responses/Ok.response');

const signup = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    let errors = [];

    if(!name)
      errors.push(RequestErrors.INVALID.NAME);

    if(!email)
      errors.push(RequestErrors.INVALID.EMAIL);

    if(!password)
      errors.push(RequestErrors.INVALID.PASSWORD);

    if (!!errors.length)
      res.status(CodeResponse.BAD_REQUEST.code).json(ApiResponse.error(CodeResponse.BAD_REQUEST.message, errors));

    const accessToken = await authService.createUser(name, email, password);

    res.status(CodeResponse.CREATED.code).json(ApiResponse.success(CodeResponse.CREATED.message, accessToken));

  } catch (error) {
    res.status(CodeResponse.INTERNAL_SERVER_ERROR.code).json(ApiResponse.error(CodeResponse.INTERNAL_SERVER_ERROR.message, []));
  }
}

const signin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    let errors = [];

    if(!email)
      errors.push(RequestErrors.INVALID.EMAIL);

    if(!password)
      errors.push(RequestErrors.INVALID.PASSWORD);

    if (!!errors.length)
      res.status(CodeResponse.BAD_REQUEST.code).json(ApiResponse.error(CodeResponse.BAD_REQUEST.message, errors));

    const accessToken = authService.authenticateUser(email, password);

    res.status(CodeResponse.OK.code).json(ApiResponse.success(CodeResponse.OK.message, accessToken));

  } catch (error) {
    res.status(CodeResponse.INTERNAL_SERVER_ERROR.code).json(ApiResponse.error(CodeResponse.INTERNAL_SERVER_ERROR.message, []));
  }
}

module.exports = {
    signup,
    signin
}
