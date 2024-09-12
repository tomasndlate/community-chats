const { sendErrorResponse } = require('../../core/utils/responseUtils');
const passport = require('../../configs/passportConfig');

const googleMiddleware = (req, res, next) => {
    passport.authenticate('google', { session: false }, (error, user, info) => {
        if(!!error)
            sendErrorResponse(res, error.statusCode, error.message);

        if(!!user)
            req.user = user;

        next();

    })(req, res, next);
}

module.exports = googleMiddleware;
