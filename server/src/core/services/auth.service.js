const User = require('../models/User');
const { encryptPassword, comparePassword } = require('../utils/passwordUtils');

const { RequestErrors } = require('../../responses/errors/RequestErrors.enum');
const authTokenUtils = require('../utils/auth-token.utils');

/**
 * Create an user in the DB
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {[Object|null, string[]|null]} A set where:
 * - If user created ( Access Token, null )
 * - If errors found ( null, erros )
 *
 * @example
 * // Returns a token object with no errors:
 * ({accessToken: "abc123"}, null)
 *
 * @example
 * // Returns an array with errors:
 * ({null, [error1, error2])
 */
exports.createUser = async (name, email, password) => {
  try {
    const existentEmail = await User.findOne({email: email});
    let errors = [];

    if (!!existentEmail)
        errors.push(RequestErrors.DUPLICATED.EMAIL);

    if (!!errors.length)
        return (null, errors);

    const encryptedPassword = await encryptPassword(password);

    const user = new User({
      name: name,
      email: email,
      password: encryptedPassword
    });

    const createdUser = await user.save();
    const accessToken = await this.generateAuthToken(createdUser._id);

    return ({ accessToken: accessToken }, null);

  } catch (error) {
    throw error;
  }
};

/**
 * Autheticate user
 * @param {string} email
 * @param {string} password
 * @returns {[Object|null, string[]|null]} A set where:
 * - If user is authenticate successfully ( Access Token, null )
 * - If errors found ( null, erros )
 *
 * @example
 * // Returns a token object with no errors:
 * ({accessToken: "abc123"}, null)
 *
 * @example
 * // Returns an array with errors:
 * ({null, [error1, error2])
 */
exports.authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if(!user)
      return (null, [RequestErrors.NOT_FOUND.EMAIL]);

    if(!user.password)
      return (null, [RequestErrors.UNAUTHORIZED.OTHER_SIGNIN]);

    const isValidPassword = await comparePassword(password, user.password);

    if(!isValidPassword)
      return (null, [RequestErrors.UNAUTHORIZED.SIGNIN]);

    const accessToken = authTokenUtils.generateAuthToken(user._id);

    return ({ accessToken: accessToken }, null);

  } catch (error) {
    throw error;
  }
}

exports.generateAuthToken = (userId) => {
  return authTokenUtils.generateAuthToken(userId);
}
