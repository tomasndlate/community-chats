const Thread = require("../models/Thread");

// TODO: Implement when creating threads
exports.generateUniqueNameId = async (communityId, name, suffix = '', count = 0) => {
    
    let nameId = name.toLowerCase().replace(/\s+/g, '-');

    if (suffix)
        nameId += '-' + suffix;

    const existingCommunity = await Thread.findOne({ nameId: nameId, community: communityId });

    if (existingCommunity){
        count++;
        return generateUniqueNameId(name, count, count);
    }
    
    return nameId;
}