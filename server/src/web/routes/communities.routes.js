const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    createCommunity,
    getCommunities,
    getCommunity,
    putCommunityMembers,
    putJoinCommunity,
    getCommunityMembers,
    getCommunityThreads,
    getCommunityThread
} = require('../controllers/rest/communitiesController');

// Create community
router.post('/', authMiddleware, createCommunity);

// Get all communities (optional params)
router.get('/', getCommunities);

// Get community by nameId
// TODO: Change from name to nameID
router.get('/:community', getCommunity);

// Add members to a community
router.put('/:community/members', authMiddleware, putCommunityMembers);

// Get community members
router.get('/:community/members', getCommunityMembers);

// Join a community
router.put('/:community/join', authMiddleware, putJoinCommunity);

// Get Community Threads
router.get('/:community/threads', getCommunityThreads);

// Get Community Thread
router.get('/:community/threads/:threadNameId', getCommunityThread);

module.exports = router;
