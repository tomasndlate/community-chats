import { Types } from "mongoose";
import { ICommunityDocument, Community } from "../models/Community.db";
import { CodeResponse, CodeResponseType } from "../../constants/CodeResponse.enum";
import { ErrorConstants, ErrorConstantsType } from "../../constants/ErrorsConstants.enum";
import { IMessageDocument, Message } from "../models/Message.db";

export const createCommunity = async (userId: Types.ObjectId, name: string, description: string, members: Types.ObjectId[]):
Promise<[{ id: Types.ObjectId } | null, {error: CodeResponseType, errors: ErrorConstantsType[]} | null]> => {
    try {
      const community: ICommunityDocument = new Community({
        owner: userId,
        name: name,
        description: description,
        messages: [],
        members: members
      });
      await community.save();

      return [{ id: community._id }, null];

    } catch (error) {
      throw error;
    }
};

export const findCommunitiesByName = async (name: string, page: number, limit: number) => {
  try {
    const nameFilter = name != '*' ? { name: {$regex: new RegExp(name, 'i')} } : {};

    const communities = await Community.find(nameFilter).skip((page - 1) * limit).limit(limit);

    return communities;

  } catch (error) {
      throw error;
  }
}

export const findCommunityById = async (id: Types.ObjectId):
Promise<[ICommunityDocument | null, {error: CodeResponseType, errors: ErrorConstantsType[]} | null]> => {
  try {
    const community: ICommunityDocument | null = await Community.findById(id);

    if (!community)
      return [null, {error: CodeResponse.NOT_FOUND, errors: [ErrorConstants.NOT_FOUND.COMMUNITY]}];

    return [community, null];

  } catch (error) {
    throw error;
  }
}
export const findCommunityById_Messages = async (id: Types.ObjectId):
Promise<[IMessageDocument[] | null, {error: CodeResponseType, errors: ErrorConstantsType[]} | null]> => {
  try {
    const community: ICommunityDocument | null = await Community.findById(id);

    if (!community)
      return [null, {error: CodeResponse.NOT_FOUND, errors: [ErrorConstants.NOT_FOUND.COMMUNITY]}];

    const messages: IMessageDocument[] = await Message.find({ _id: { $in: community.messages } })

    return [messages, null];

  } catch (error) {
    throw error;
  }
}

// exports.addMembers = async (userId, communityName, membersUsername) => {
//     try {
//         const membersIds = await mapUsernamesToIds(membersUsername);

//         if (!membersIds)
//             throw new BadRequestError('Bad Request: Not all usernames are correct')

//         const community = await Community.findOne({ name: communityName });

//         if (!community)
//             throw new BadRequestError('Bad Request: Community not found');

//         if (community.owner.toString() != userId.toString())
//             throw new AuthorizationError('Unathorized: User is not the community owner');

//         const updatedResult = await Community.updateOne(
//             { _id: community._id },
//             { $addToSet: { members: { $each: membersIds } } }
//         );

//         if (updatedResult.ok === 0)
//             throw new DatabaseError('Database error.');

//         return await Community.findOne({name: communityName});

//     } catch (error) {
//         error = !error.statusCode ? new DatabaseError('Database error.') : error;
//         throw error;
//     }
// }

// exports.addMember = async (userId, communityName) => {
//     try {
//         const community = await Community.findOne({ name: communityName });

//         if (!community)
//             throw new BadRequestError('Bad Request: Community not found');

//         const updatedResult = await Community.updateOne(
//             { _id: community._id },
//             { $addToSet: { members: userId } }
//         );

//         if (updatedResult.ok === 0)
//             throw new DatabaseError('Database error.');

//         return await Community.findOne({name: communityName});

//     } catch (error) {
//         error = !error.statusCode ? new DatabaseError('Database error.') : error;
//         throw error;
//     }

// }

// exports.getMembers = async (communityName) => {
//     try {
//         const communityMembers = await Community.findOne({ name: communityName }).select({ _id: 0, members: 1 });

//         if (!communityMembers)
//             throw new NotFoundError('Not Found: Community not found');

//         return communityMembers;

//     } catch (error) {
//         error = !error.statusCode ? new DatabaseError('Database error.') : error;
//         throw error;
//     }
// }

// exports.getThreads = async (communityName, name, page, limit) => {
//     try {

//         const communityId = await Community.findOne({ name: communityName }).select({ _id: 1});

//         if (!communityId)
//             throw new NotFoundError('Community Not Found');

//         let query = { community: communityId };

//         if (name != '*')
//             query.name = { $regex: new RegExp(name, 'i') };

//         const communityThreads = await Thread.find(query).skip((page - 1) * limit).limit(limit);

//         if (!communityThreads)
//             throw new NotFoundError('Not Found: Community not found');

//         return communityThreads;

//     } catch (error) {
//         error = !error.statusCode ? new DatabaseError('Database error.') : error;
//         throw error;
//     }
// }

// exports.getThread = async (communityName, threadNameId) => {
//     try {

//         const communityId = await Community.findOne({ name: communityName }).select({ _id: 1});

//         if (!communityId)
//             throw new NotFoundError('Community Not Found');

//         console.log(communityName, threadNameId)
//         const communityThread = await Thread.findOne({ community: communityId, nameId: threadNameId });

//         if (!communityThread)
//             throw new NotFoundError('Thread not found');

//         return communityThread;

//     } catch (error) {
//         error = !error.statusCode ? new DatabaseError('Database error.') : error;
//         throw error;
//     }
// }

// /**
//  * Validate if users exist by their username and return array of ids.
//  * @param {string[]} usernames Arrays of users id
//  * @returns {ObjectId[] | null} Array of users id | Null if some username doesn't exist
//  * @throws {DatabaseError} If an error occurs during the validation process
//  */
// const mapUsernamesToIds = async (usernames) => {
//     try {
//         const users = await User.find({ username: { $in: usernames } }).select({ _id: 1 });

//         if (users.length != usernames.length)
//             return null;

//         return users;

//     } catch (error) {
//         throw new DatabaseError('Database error.');
//     }
// };
