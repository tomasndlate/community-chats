import { Request, Response } from 'express';
import { ApiResponse } from '../../responses/ApiResponse';
import { createUser, authenticateUser } from '../../core/services/auth.service';
import  { CodeResponse } from '../../responses/CodeResponse.enum';
import  { ErrorConstants } from '../../responses/ErrorsConstants.enum';
import { logger } from 'express-winston';
import { expressLogger } from '../../configs/winston.config';

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
    } else {
      res.status(CodeResponse.CREATED.code).json(ApiResponse.success(CodeResponse.CREATED.message, accessToken));
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
    } else {
      res.status(CodeResponse.OK.code).json(ApiResponse.success(CodeResponse.OK.message, accessToken));
    }
    return;

  } catch (error) {
    console.error(`ERROR CATCH: ${error}`);
    res.status(CodeResponse.INTERNAL_SERVER_ERROR.code).json(ApiResponse.error(CodeResponse.INTERNAL_SERVER_ERROR.message, null));
  }
}
