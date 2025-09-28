const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret'
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  // You can fetch user from DB here if needed
  if (jwt_payload) {
    return done(null, jwt_payload);
  } else {
    return done(null, false);
  }
}));

module.exports = passport;