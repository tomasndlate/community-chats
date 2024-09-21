import { Types } from "mongoose"

export interface ICommunity_Communities {
  communities: {
    id: Types.ObjectId,
    name: string,
    description: string,
    startDate: Date
  }[]
}

export interface ICommunity_Community {
  community: {
    id: Types.ObjectId,
    name: string,
    description: string,
    startDate: Date,
    members: {
      id: Types.ObjectId,
      name: string
    }[]
  }
}

export interface ICommunity_CommunityId {
  id: Types.ObjectId,
}

export interface ICommunity_Messages {
  messages: {
    id: Types.ObjectId,
    content: string,
    sender: {
      id: Types.ObjectId,
      name: string
    },
    date: Date
  }[]
}


