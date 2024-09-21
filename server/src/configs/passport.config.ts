// @ts-ignore
export const passport = require('passport');
// const LocalStrategy = require('passport-local');
// @ts-ignore
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../core/models/User');
// const { comparePassword } = require('../core/utils/passwordUtils');
// const AuthenticationError = require('../errors/Unauthorized.error');
// @ts-ignore
const ServerError = require('../errors/InternalServer.error');
// const AuthorizationError = require('../errors/AuthorizationError');
// @ts-ignore
const NotFoundError = require('../errors/NotFound.error');
// @ts-ignore
const JwtStrategy = require('passport-jwt').Strategy;
// @ts-ignore
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new GoogleStrategy({
    // code executed in /auth/google
    clientID: process.env.API_GOOGLE_CLIENT_ID,
    clientSecret: process.env.API_GOOGLE_CLIENT_KEY,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  // code executed in /auth/google/callback
  // @ts-ignore
  async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user is already authenticated via Google OAuth2
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser)
            return done(null, existingUser);

        // Is normal user
        const normalUser = await User.findOne({ email: profile.email });
        if (normalUser) {
            normalUser.googleId = profile.id;
            await normalUser.save();
            return done(null, normalUser);
        }

        // New Google authenticated user
        const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.email,
        });
        await newUser.save();
        return done(null, newUser);

    } catch (error) {
        // @ts-ignore
        error = !error.statusCode ? new ServerError('Internal error.') : error;
        done(error, false);
    }

}));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.API_JWT_SECRET
    // @ts-ignore
    }, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.userId);

        if (!user)
            throw new NotFoundError('User not found');

        done(null, user);

    } catch (error) {
        // @ts-ignore
        error = !error.statusCode ? new ServerError('Internal error.') : error;
        done(error, false);
    }
}));

// module.exports = passport;
