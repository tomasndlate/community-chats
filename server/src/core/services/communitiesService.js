const User = require('../models/User');
const Community = require('../models/Community');
const DatabaseError = require('../errors/DatabaseError');
const BadRequestError = require('../errors/BadRequest.error');
const NotFoundError = require('../errors/NotFound.error');
const AuthorizationError = require('../errors/AuthorizationError');
const mongoose = require('mongoose');
const Thread = require('../models/Thread');


exports.create = async (owner, name, description, members) => {
    try {
        
        const newCommunity = new Community({
            owner: owner, 
            name: name, 
            description: description, 
            members: members
        });
        await newCommunity.save();
        
        const defaultThread = new Thread({
            community: newCommunity._id,
            nameId: "general",
            name: "General"
        })
        await defaultThread.save();

        newCommunity.threads.push(defaultThread.nameId);
        await newCommunity.save();
        
        return newCommunity;

    } catch (error) {
        // Duplicate key violation
        if ([11000, 11001].includes(error.code)) {
            throw new BadRequestError('Name already exists.');
        }
        // Default error
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
};

exports.find = async (name, page, limit) => {
    try {
        
        const filterByName = name != '*' 
                ? { name: { $regex: new RegExp(name, 'i') } } 
                : {};
        
        const communities = await Community.find(filterByName).skip((page - 1) * limit).limit(limit);

        return communities;

    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
}

exports.getByName = async (name) => {
    try {
        const community = await Community.findOne({name: name});

        if (!community)
            throw new NotFoundError('Community Not Found');

        return community;

    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
}

exports.addMembers = async (userId, communityName, membersUsername) => {
    try {
        const membersIds = await mapUsernamesToIds(membersUsername);
        
        if (!membersIds)
            throw new BadRequestError('Bad Request: Not all usernames are correct')

        const community = await Community.findOne({ name: communityName });

        if (!community)
            throw new BadRequestError('Bad Request: Community not found');
        
        if (community.owner.toString() != userId.toString())
            throw new AuthorizationError('Unathorized: User is not the community owner');
     
        const updatedResult = await Community.updateOne(
            { _id: community._id },
            { $addToSet: { members: { $each: membersIds } } }
        );
        
        if (updatedResult.ok === 0)
            throw new DatabaseError('Database error.');

        return await Community.findOne({name: communityName});
        
    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
}

exports.addMember = async (userId, communityName) => {
    try {
        const community = await Community.findOne({ name: communityName });

        if (!community)
            throw new BadRequestError('Bad Request: Community not found');
        
        const updatedResult = await Community.updateOne(
            { _id: community._id },
            { $addToSet: { members: userId } }
        );

        if (updatedResult.ok === 0)
            throw new DatabaseError('Database error.');

        return await Community.findOne({name: communityName});

    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
    
}

exports.getMembers = async (communityName) => {
    try {
        const communityMembers = await Community.findOne({ name: communityName }).select({ _id: 0, members: 1 });

        if (!communityMembers)
            throw new NotFoundError('Not Found: Community not found');

        return communityMembers;

    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
}

exports.getThreads = async (communityName, name, page, limit) => {
    try {
        
        const communityId = await Community.findOne({ name: communityName }).select({ _id: 1});
        
        if (!communityId)
            throw new NotFoundError('Community Not Found');

        let query = { community: communityId };
        
        if (name != '*')
            query.name = { $regex: new RegExp(name, 'i') };
        
        const communityThreads = await Thread.find(query).skip((page - 1) * limit).limit(limit);

        if (!communityThreads)
            throw new NotFoundError('Not Found: Community not found');

        return communityThreads;

    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
}

exports.getThread = async (communityName, threadNameId) => {
    try {
        
        const communityId = await Community.findOne({ name: communityName }).select({ _id: 1});
        
        if (!communityId)
            throw new NotFoundError('Community Not Found');
        
        console.log(communityName, threadNameId)
        const communityThread = await Thread.findOne({ community: communityId, nameId: threadNameId });

        if (!communityThread)
            throw new NotFoundError('Thread not found');

        return communityThread;

    } catch (error) {
        error = !error.statusCode ? new DatabaseError('Database error.') : error;
        throw error;
    }
}

/**
 * Validate if users exist by their username and return array of ids.
 * @param {string[]} usernames Arrays of users id
 * @returns {ObjectId[] | null} Array of users id | Null if some username doesn't exist
 * @throws {DatabaseError} If an error occurs during the validation process
 */
const mapUsernamesToIds = async (usernames) => {
    try {
        const users = await User.find({ username: { $in: usernames } }).select({ _id: 1 });

        if (users.length != usernames.length)
            return null;
        
        return users;

    } catch (error) {
        throw new DatabaseError('Database error.');
    }    
};