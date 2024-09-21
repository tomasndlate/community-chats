import mongoose, { Schema, Types, Document, Model } from 'mongoose';

export interface ICommunity {
  owner: Types.ObjectId,
  name: string,
  description: string,
  messages: Types.ObjectId[],
  members: Types.ObjectId[],
  startDate: Date,
}

// User returned from DB
export interface ICommunityDocument extends ICommunity, Document {}

// User Table in DB
export interface ICommunityModel extends Model<ICommunityDocument> {}

const communitySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Thread'
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    startDate: {
        type: Date,
        default: Date.now,
    },
});

// communitySchema.pre("save", async function (next) {
//     try {
//         if(this.members.length === 0)
//             next();

//         const isMembersValid = await User.countDocuments({ _id: { $in: this.members } }) === this.members.length ? true : false;
//         if (!isMembersValid)
//             throw new BadRequestError('Not all members are valid');

//         next();

//     } catch (error) {
//         error = !error.statusCode ? new DatabaseError('Database error.') : error;
//         next(error);
//     }
// })

export const Community: ICommunityModel = mongoose.model<ICommunityDocument, ICommunityModel>('Community', communitySchema);

