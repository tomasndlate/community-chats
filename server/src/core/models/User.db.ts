import mongoose, { Document, Model } from 'mongoose';

export interface IUser {
  googleId?: string;
  name: string;
  email: string;
  password?: string;
}

// User returned from DB
export interface IUserDocument extends IUser, Document {}

// User Table in DB
export interface IUserModel extends Model<IUserDocument> {}

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
});

export const User: IUserModel = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

// module.exports = User;
