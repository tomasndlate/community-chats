import { IUserDocument, User } from "../models/User.db";
import { encryptPassword, comparePassword } from '../utils/password.utils';
import { ErrorConstants, ErrorConstantsType } from '../../constants/ErrorsConstants.enum';
import { CodeResponse, CodeResponseType } from '../../constants/CodeResponse.enum';
import { validateAuthToken } from "../utils/auth-token.utils";

// const authTokenUtils = require('../utils/auth-token.utils');
import { generateAuthToken } from '../utils/auth-token.utils';

export const createUser = async (name: string, email: string, password: string):
  Promise<[{ accessToken: string } | null, {error: CodeResponseType, errors: ErrorConstantsType[]} | null]> => {
  try {
    const existentEmail = await User.findOne({email: email});
    let errors: ErrorConstantsType[] = [];

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
    const accessToken = await getAuthToken(createdUser._id.toString());

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

    const accessToken = generateAuthToken(user._id);

    return [{ accessToken: accessToken }, null];

  } catch (error) {
    throw error;
  }
}

export const isTokenAuthenticated = async (accessToken: string): Promise< IUserDocument | null> => {
  try {

    const userId = validateAuthToken(accessToken);

    console.log(`TOKEN DECODED ${userId.toString()}`)
    const user: IUserDocument | null = await User.findById(userId as string);
    console.log(`USER ${user}`)

    return user;

  } catch (error) {
    return null;
  }
}

const getAuthToken = (userId: string) => {
  return generateAuthToken(userId);
}
