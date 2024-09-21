import { Request, Response } from 'express';
import { ApiResponse } from '../interfaces/ApiResponse';
import { createUser, authenticateUser } from '../../core/services/auth.service';
import  { CodeResponse } from '../../constants/CodeResponse.enum';
import  { ErrorConstants } from '../../constants/ErrorsConstants.enum';
import { IAuth_AccessToken } from '../interfaces/IAuthResponses.interface';

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    let requestErrors = [];

    if(!name)
      requestErrors.push(ErrorConstants.INVALID.NAME);

    if(!email)
      requestErrors.push(ErrorConstants.INVALID.EMAIL);

    if(!password)
      requestErrors.push(ErrorConstants.INVALID.PASSWORD);

    if (!!requestErrors.length) {
      res.status(CodeResponse.BAD_REQUEST.code).json(ApiResponse.error(CodeResponse.BAD_REQUEST.message, requestErrors));
      return;
    }

    const [accessToken, errors] = await createUser(name, email, password);

    if (!!errors) {
      res.status(errors.error.code).json(ApiResponse.error(errors.error.message, errors.errors));
    }
    else if (!!accessToken) {
      const accessTokenResponse: IAuth_AccessToken = accessToken;
      res.status(CodeResponse.CREATED.code).json(ApiResponse.success(CodeResponse.CREATED.message, accessTokenResponse));
    }
    return;

  } catch (error) {
    console.error(`ERROR CATCH: ${error}`);
    res.status(CodeResponse.INTERNAL_SERVER_ERROR.code).json(ApiResponse.error(CodeResponse.INTERNAL_SERVER_ERROR.message, null));
  }
}

export const signin = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    let requestErrors = [];

    if(!email)
      requestErrors.push(ErrorConstants.INVALID.EMAIL);

    if(!password)
      requestErrors.push(ErrorConstants.INVALID.PASSWORD);

    if (!!requestErrors.length) {
      res.status(CodeResponse.BAD_REQUEST.code).json(ApiResponse.error(CodeResponse.BAD_REQUEST.message, requestErrors));
      return;
    }

    const [accessToken, errors] = await authenticateUser(email, password);

    if (!!errors) {
      res.status(errors.error.code).json(ApiResponse.error(errors.error.message, errors.errors));
    }
    else if (!!accessToken){
      const accessTokenResponse: IAuth_AccessToken = accessToken;
      res.status(CodeResponse.OK.code).json(ApiResponse.success(CodeResponse.OK.message, accessTokenResponse));
    }
    return;

  } catch (error) {
    console.error(`ERROR CATCH: ${error}`);
    res.status(CodeResponse.INTERNAL_SERVER_ERROR.code).json(ApiResponse.error(CodeResponse.INTERNAL_SERVER_ERROR.message, null));
  }
}
