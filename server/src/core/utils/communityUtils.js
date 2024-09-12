const Community = require("../models/Community");

// TODO: Implement when creating communities
exports.generateUniqueNameId = async (name, suffix = '', count = 0) => {
    
    let nameId = name.toLowerCase().replace(/\s+/g, '-');

    if (suffix)
        nameId += '-' + suffix;

    const existingCommunity = await Community.findOne({ nameId });

    if (existingCommunity){
        count++;
        return generateUniqueNameId(name, count, count);
    }
    
    return nameId;
}