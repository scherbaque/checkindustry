import Profile from '../models/profile';

const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const jwt = require('jsonwebtoken');

const passportConfig = passport => {
  const CALLBACK =
    process.env.NODE_ENV === 'production'
      ? process.env.CALLBACK
      : 'http://localhost:5000/api/v1/auth/linkedin/callback';

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
    // where is this user.id going? Are we supposed to access this anywhere?
  });

  // used to deserialize the user
  // passport.deserializeUser(function(id, done) {
  //   User.findById(id, function(err, user) {
  //     done(err, user);
  //   });
  // });

  /* Google Oauth Strategy */
  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.LCLIENT_ID || '81hve8trgpdgxr',
        clientSecret: process.env.LCLIENT_SECRET || 'TcTRgyr8OD69Cirx',
        callbackURL: 'http://165.227.31.115:5000/api/v1/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_liteprofile']
      },
      (req, accessToken, refreshToken, user, done) => {
        // asynchronous verification, for effect...
        process.nextTick(async function() {
          /* Checking if Proile already exists */
          const profile = await Profile.findOne({ id: user.id });
          if (profile) {
            const token = jwt.sign({ id: user.id }, 'secret', {
              expiresIn: '24h'
            });

            console.log('1st token', token);

            return done(null, token);
          }

          /* If Profile not found, save in the databse */
          await Profile.create({
            id: user.id,
            user: {
              name: user.displayName,
              email: user.emails[0].value
            }
          });

          /* Creating JWT token */
          const token = jwt.sign({ id: user.id }, 'secret', {
            expiresIn: '24h'
          });

          console.log('2nd token', token);

          return done(null, token);
        });
      }
    )
  );
};

export default passportConfig;
