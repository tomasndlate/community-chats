import mongoose, { Schema, Types, Document, Model } from 'mongoose';

export interface IMessage {
  communityId: Types.ObjectId,
  senderId: Types.ObjectId,
  content: string
}

// User returned from DB
export interface IMessageDocument extends IMessage, Document {}

// User Table in DB
export interface IMessageModel extends Model<IMessageDocument> {}


const messageSchema = new mongoose.Schema({
    communityId: {
        type: Types.ObjectId,
        ref: 'Community',
        required: true
    },
    senderId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        require: true
    },
    sentDate: {
        type: Date,
        default: Date.now,
    },
});

export const Message: IMessageModel = mongoose.model<IMessageDocument, IMessageModel>('Message', messageSchema);
