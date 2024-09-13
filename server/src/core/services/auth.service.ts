// const User = require('../models/User');
import { User } from "../models/User.db";
import { encryptPassword, comparePassword } from '../utils/password.utils';
import { ErrorConstants, ErrorConstantsType } from '../../responses/ErrorsConstants.enum';
import { CodeResponse, CodeResponseType } from '../../responses/CodeResponse.enum';
const authTokenUtils = require('../utils/auth-token.utils');

export const createUser = async (name: string, email: string, password: string):
  Promise<[{ accessToken: string } | null, {error: CodeResponseType, errors: ErrorConstantsType[]} | null]> => {
  try {
    const existentEmail = await User.findOne({email: email});
    let errors: ErrorConstantsType[] = [];

    console.log(existentEmail)
    if (!!existentEmail)
        errors.push(ErrorConstants.DUPLICATED.EMAIL);

    if (!!errors.length)
        return [null, {error: CodeResponse.CONFLICT, errors: errors}];

    const encryptedPassword = await encryptPassword(password);

    const user = new User({
      name: name,
      email: email,
      password: encryptedPassword
    });


    const createdUser = await user.save();
    const accessToken = await generateAuthToken(createdUser._id.toString());

    return [{ accessToken: accessToken }, null];

  } catch (error) {
    throw error;
  }
};


export const authenticateUser = async (email: string, password: string):
  Promise<[{ accessToken: string } | null, {error: CodeResponseType, errors: ErrorConstantsType[]} | null]> => {
  try {
    const user = await User.findOne({ email });

    if(!user)
      return [null, {error: CodeResponse.NOT_FOUND, errors: [ErrorConstants.NOT_FOUND.EMAIL]}];

    if(!user.password)
      return [null, {error: CodeResponse.UNAUTHORIZED, errors: [ErrorConstants.UNAUTHORIZED.OTHER_SIGNIN]}];

    const isValidPassword = await comparePassword(password, user.password);

    if(!isValidPassword)
      return [null, {error: CodeResponse.UNAUTHORIZED, errors: [ErrorConstants.UNAUTHORIZED.SIGNIN]}];

    const accessToken = authTokenUtils.generateAuthToken(user._id);

    return [{ accessToken: accessToken }, null];

  } catch (error) {
    throw error;
  }
}

const generateAuthToken = (userId: string) => {
  return authTokenUtils.generateAuthToken(userId);
}
