const { profileGetMethod } = require('./profile/profile-get.method');

const profilePath = {

    '/profile': {
        get: profileGetMethod,
        // post: {},
        // put: {},
        // delete: {}
    },
}

module.exports = {
    profilePath
}