const { sendErrorResponse } = require('../utils/responseUtils');
const passport = require('../configs/passportConfig');
const AuthorizationError = require('../errors/AuthorizationError');

const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
        try {
            if(!!error) 
                throw error;
            
            if(!user) 
                throw new AuthorizationError('Unauthorized token');
            
            req.user = user;
            next();

        } catch (error) {
            error = !error.statusCode ? new ServerError('Internal error.') : error;
            sendErrorResponse(res, error.statusCode, error.message);
        }
        

    })(req, res, next);
} 

module.exports = authMiddleware;