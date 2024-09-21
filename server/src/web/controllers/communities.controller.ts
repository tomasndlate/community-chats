import { Request, Response } from 'express';
import { RequestMiddleware } from '../middleware/request-middleware.interface';
import { IUserDocument } from '../../core/models/User.db';
import { ErrorConstants } from '../../constants/ErrorsConstants.enum';
import { CodeResponse } from '../../constants/CodeResponse.enum';
import { ApiResponse } from '../interfaces/ApiResponse';
import { Types } from 'mongoose';

// const communitiesService = require('../../services/communitiesService');

import {createCommunity, findCommunitiesByName, findCommunityById, findCommunityById_Messages} from '../../core/services/communities.service'
import { ICommunity_Communities, ICommunity_Community, ICommunity_CommunityId, ICommunity_Messages } from '../interfaces/ICommunityResponses.interface';

export const postCommunity = async (req: RequestMiddleware, res: Response) => {
  let user: IUserDocument;
  let name: string;
  let description: string = "";
  let membersId: Types.ObjectId[] = [];

  try {
    // Required fields in request
    let requestErrors = [];

    if(!req.user)
      requestErrors.push(ErrorConstants.INVALID.USER);

    if(!req.body.name)
      requestErrors.push(ErrorConstants.INVALID.NAME);

    if (!!requestErrors.length) {
      res.status(CodeResponse.BAD_REQUEST.code).json(ApiResponse.error(CodeResponse.BAD_REQUEST.message, requestErrors));
      return;
    }

    user = req.user as IUserDocument;
    name = req.body.name as string;

    // Optional fields in the request
    if(!!req.body.description)
      description = req.body.description as string;

    if(!!req.body.membersId)
      membersId = req.body.members as Types.ObjectId[];

    const [community, errors]  = await createCommunity(user._id, name, description, membersId);

    if (!!errors) {
      res.status(errors.error.code).json(ApiResponse.error(errors.error.message, errors.errors));
    } else if (!!community) {
      const communityIdResponse: ICommunity_CommunityId = {
        id: community.id
      }
      res.status(CodeResponse.CREATED.code).json(ApiResponse.success(CodeResponse.CREATED.message, communityIdResponse));
    }
    return;

  } catch (error) {
    console.error(`ERROR CATCH: ${error}`);
    res.status(CodeResponse.INTERNAL_SERVER_ERROR.code).json(ApiResponse.error(CodeResponse.INTERNAL_SERVER_ERROR.message, null));
  }
}

export const getCommunities = async (req: Request, res: Response) => {
  let name = '*';
  let page = 1;
  let limit = 20;
  try {
    if(!!req.query.name)
      name = req.body.name
    if(!!req.query.page)
      page = parseInt(req.query.page as string)
    if(!!req.query.limit)
      limit = parseInt(req.query.limit as string)

    let requestErrors = [];
    if (isNaN(page) || page < 1)
      requestErrors.push(ErrorConstants.INVALID.FILTER_PAGE);
    if (isNaN(limit) || limit < 1)
      requestErrors.push(ErrorConstants.INVALID.FILTER_LIMIT);

    if (!!requestErrors.length) {
      res.status(CodeResponse.BAD_REQUEST.code).json(ApiResponse.error(CodeResponse.BAD_REQUEST.message, requestErrors));
      return;
    }

    const communities = await findCommunitiesByName(name, page, limit);

    const communitiesResponse: ICommunity_Communities = {
      communities: communities.map(c => { return {
        id: c._id,
        name: c.name,
        description: c.description,
        startDate: c.startDate
      }})
    }

    res.status(CodeResponse.OK.code).json(ApiResponse.success(CodeResponse.OK.message, communitiesResponse));

  } catch (error) {
    console.error(`ERROR CATCH: ${error}`);
    res.status(CodeResponse.INTERNAL_SERVER_ERROR.code).json(ApiResponse.error(CodeResponse.INTERNAL_SERVER_ERROR.message, null));
  }
}

export const getCommunity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const [community, errors] = await findCommunityById(id);

    if (!!errors) {
      res.status(errors.error.code).json(ApiResponse.error(errors.error.message, errors.errors));
    }
    else if (!!community) {
      const communityIdResponse: ICommunity_Community = {
        community: {
          id: community.id,
          name: community.name,
          description: community.description,
          startDate: community.startDate,
          members: community.members.map(m => { return {
            id: m._id,
            name: "to be updated"
          }})
        }
      }
      res.status(CodeResponse.CREATED.code).json(ApiResponse.success(CodeResponse.CREATED.message, communityIdResponse));
    }
    return;

    } catch (error) {
      console.error(`ERROR CATCH: ${error}`);
    res.status(CodeResponse.INTERNAL_SERVER_ERROR.code).json(ApiResponse.error(CodeResponse.INTERNAL_SERVER_ERROR.message, null));
  }
}

export const getCommunityMessages = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      console.log(id)

      const [messages, errors] = await findCommunityById_Messages(id);

    if (!!errors) {
      res.status(errors.error.code).json(ApiResponse.error(errors.error.message, errors.errors));
    }

    else if (!!messages) {
      const messagesResponse: ICommunity_Messages = {
        messages: messages.map(m => {return {
          id: m._id,
          content: m.content,
          sender: {
            id: m.senderId,
            name: 'TBD'
          },
          date: m.sentDate
        }})
      }
      res.status(CodeResponse.OK.code).json(ApiResponse.success(CodeResponse.OK.message, messagesResponse));
    }
    return;

    } catch (error) {
      console.error(`ERROR CATCH: ${error}`);
    res.status(CodeResponse.INTERNAL_SERVER_ERROR.code).json(ApiResponse.error(CodeResponse.INTERNAL_SERVER_ERROR.message, null));
  }
}

// exports.putCommunityMembers = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const { community } = req.params;
//         const members = req.body.members;

//         const updatedCommunity = await communitiesService.addMembers(userId, community, members);

//         sendJsonResponse(res, HttpStatus.OK, updatedCommunity);

//     } catch (error) {
//         error = !error.statusCode ? new ServerError('Internal error.') : error;
//         sendErrorResponse(res, error.statusCode, error.message);
//     }
// }

// exports.getCommunityMembers = async (req, res) => {
//     try {
//         const { community } = req.params;

//         const communityMembers = await communitiesService.getMembers(community);

//         sendJsonResponse(res, HttpStatus.OK, communityMembers);

//     } catch (error) {
//         error = !error.statusCode ? new ServerError('Internal error.') : error;
//         sendErrorResponse(res, error.statusCode, error.message);
//     }
// }

// exports.putJoinCommunity = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const { community } = req.params;

//         const updatedCommunity = await communitiesService.addMember(userId, community);

//         sendJsonResponse(res, HttpStatus.OK, updatedCommunity);
//     } catch (error) {
//         error = !error.statusCode ? new ServerError('Internal error.') : error;
//         sendErrorResponse(res, error.statusCode, error.message);
//     }
// }

// exports.getCommunityThreads = async (req, res) => {
//     try {
//         const { community } = req.params;
//         const { name = '*', page = 1, limit = 20 } = req.query;

//         // TODO: Handle the name parameter for not allowed digits
//         const filterName = name;
//         const filterPage = parseInt(page);
//         const filterLimit = parseInt(limit);

//         if (isNaN(filterPage) || filterPage < 1)
//             throw new BadRequestError('Invalid page number');

//         if (isNaN(filterLimit) || filterLimit < 1)
//             throw new BadRequestError('Invalid page size');

//         const communityThreads = await communitiesService.getThreads(community, filterName, filterPage, filterLimit);

//         sendJsonResponse(res, HttpStatus.OK, communityThreads);
//     } catch (error) {
//         error = !error.statusCode ? new ServerError('Internal error.') : error;
//         sendErrorResponse(res, error.statusCode, error.message);
//     }
// }

// exports.getCommunityThread = async (req, res) => {
//     try {
//         const { community, threadNameId } = req.params;

//         const communityThread = await communitiesService.getThread(community, threadNameId);

//         sendJsonResponse(res, HttpStatus.OK, communityThread);
//     } catch (error) {
//         error = !error.statusCode ? new ServerError('Internal error.') : error;
//         sendErrorResponse(res, error.statusCode, error.message);
//     }
// }
