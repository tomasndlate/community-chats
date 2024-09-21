import { Types } from "mongoose";

export interface IMessageEvents_SubscribeCommunity {
  communityId: Types.ObjectId
}

export interface IMessageEvents_SendMessage {
  communityId: Types.ObjectId,
  content: string,
}
