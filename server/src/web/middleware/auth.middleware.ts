import { Response, Request, NextFunction } from "express";
import { RequestMiddleware } from './request-middleware.interface';
import { isTokenAuthenticated } from '../../core/services/auth.service';
import { ApiResponse } from "../interfaces/ApiResponse";
import { CodeResponse } from '../../constants/CodeResponse.enum';
import { ErrorConstants } from "../../constants/ErrorsConstants.enum";
import { IUserDocument } from "../../core/models/User.db";

export const authenticatedRequest = async (req: RequestMiddleware, res: Response, next: NextFunction) => {
  try {
    const accessToken = extractBearerToken(req);

    if (!accessToken){
      res.status(CodeResponse.UNAUTHORIZED.code).json(ApiResponse.error(CodeResponse.UNAUTHORIZED.message, [ErrorConstants.UNAUTHORIZED.TOKEN_NOT_FOUND]));
      return;
    }

    const user: IUserDocument | null = await isTokenAuthenticated(accessToken)

    if (!!user) {
      req.user = user;
      next();
      return;
    }

    res.status(CodeResponse.UNAUTHORIZED.code).json(ApiResponse.error(CodeResponse.UNAUTHORIZED.message, [ErrorConstants.UNAUTHORIZED.TOKEN_INVALID]));
    return;

  } catch (error) {
    console.error(`ERROR CATCH: ${error}`);
    res.status(CodeResponse.INTERNAL_SERVER_ERROR.code).json(ApiResponse.error(CodeResponse.INTERNAL_SERVER_ERROR.message, null));
  }
}

const extractBearerToken = (req: Request): string | null => {
  const authHeader = req.headers['authorization'];

  if (!authHeader)
    return null;

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token)
    return null;

  return token;
};
