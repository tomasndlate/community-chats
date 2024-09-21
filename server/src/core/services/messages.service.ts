// const DatabaseError = require("../errors/DatabaseError");

import { Types } from "mongoose";
import { IMessageDocument } from "../models/Message.db";
import { ICommunityDocument } from "../models/Community.db";
import { findCommunityById } from "./communities.service";
import { IUserDocument } from "../models/User.db";

// const Thread = require("../models/Thread.db");
import { Message } from "../models/Message.db";

export const createMessage = async (user: IUserDocument, community: ICommunityDocument, content: string): Promise<IMessageDocument> => {
    try {
      const message: IMessageDocument = new Message({
        communityId: community._id,
        senderId: user._id,
        content: content
      });

      await message.save();

      community.messages.push(message._id);

      community.save();

      return message;

    } catch (error) {
        throw error;
    }
};
