const mongoose = require('mongoose');
const BadRequestError = require('../errors/BadRequest.error');
const User = require('./User');
const DatabaseError = require('../errors/DatabaseError');

const communitySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    // image: string,
    description: {
        type: String,
        unique: false,
        required: false,
    },
    //    "roles": ["roleId"(string)]
    threads: [{
        type: String,
        ref: 'Thread'
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    startDate: {
        type: Date,
        default: Date.now,
    },
});

communitySchema.pre("save", async function (next) {
    try {
        if(this.members.length === 0)
            next();
        
        const isMembersValid = await User.countDocuments({ _id: { $in: this.members } }) === this.members.length ? true : false;
        if (!isMembersValid)
            throw new BadRequestError('Not all members are valid');

        next();

    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        next(error);
    }
})

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;