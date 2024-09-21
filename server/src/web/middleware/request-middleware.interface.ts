import { IUserDocument } from '../../core/models/User.db';
import { Request } from 'express';

export interface RequestMiddleware extends Request {
  user?: IUserDocument;
}
