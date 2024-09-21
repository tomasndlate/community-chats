import express from "express";
import { authenticatedRequest } from '../middleware/auth.middleware';
import { postCommunity, getCommunities, getCommunity, getCommunityMessages } from '../controllers/communities.controller';

export const communitiesRouter = express.Router();

// Create community
communitiesRouter.post('/', authenticatedRequest, postCommunity);

// Get all communities (optional params)
communitiesRouter.get('/', getCommunities);

// Get community by id
communitiesRouter.get('/:id', getCommunity);

// Get Community Messages
communitiesRouter.get('/:id/messages', getCommunityMessages);

// Add members to a community
// communitiesRouter.put('/:community/members', authMiddleware, putCommunityMembers);

// Get community members
// communitiesRouter.get('/:community/members', getCommunityMembers);

// Join a community
// communitiesRouter.put('/:community/join', authMiddleware, putJoinCommunity);


// Get Community Thread
// communitiesRouter.get('/:community/threads/:threadNameId', getCommunityThread);

// module.exports = router;
