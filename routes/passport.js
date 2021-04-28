const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const connection = require("../model/connection");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: `${process.env.SECRET}`,
    },
    (payload, done) => {
      connection.query(
        `SELECT * FROM User WHERE id = '${payload.sub}'`,
        (err, result, fields) => {
          if (err) {
            return done(err, false);
          }
          if (result.length > 0) {
            return done(null, result[0]);
          } else done(null, false);
        }
      );
    }
  )
);