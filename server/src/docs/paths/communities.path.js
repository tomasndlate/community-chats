const { getCommunitiesMethod } = require('./communities/get-communities.method');
const { postCommunitiesMethod } = require('./communities/post-communities.method');
const { getCommunityMethod } = require('./communities/community/get-community.method');
const { joinCommunityMethod } = require('./communities/community/join-community.method');
const { getCommunityMembersMethod } = require('./communities/community/members/get-community-members.method');
const { postCommunityMembersMethod } = require('./communities/community/members/post-community-members.method');
const { getCommunityThreadsMethod } = require('./communities/community/threads/get-community-threads.method');
const { getCommunityThreadMethod } = require('./communities/community/threads/thread/get-community-thread.method');

const communitiesPath = {
    '/communities': {
        get: getCommunitiesMethod,
        post: postCommunitiesMethod,
    },
    '/communities/:nameId': {
        get: getCommunityMethod,
    },
    '/communities/:nameId/join': {
        put: joinCommunityMethod,
    },
    '/communities/:nameId/members': {
        get: getCommunityMembersMethod,
        post: postCommunityMembersMethod
    },
    '/communities/:nameId/threads': {
        get: getCommunityThreadsMethod
    },
    '/communities/:nameId/thread/:threadId': {
        get: getCommunityThreadMethod
    },  
}

module.exports = {
    communitiesPath
}