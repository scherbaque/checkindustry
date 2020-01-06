import express from 'express';
import passport from 'passport';
import withAuth from '../middleware/auth';

const CLIENT_URL = 'http://www.checkyourindustry.com';

const router = express.Router();

router.get(
  '/linkedin',
  passport.authenticate('linkedin'),
  // eslint-disable-next-line no-unused-vars
  function(req, res) {
    // The request will be redirected to Linkedin for authentication, so this
    // function will not be called.
  }
);

router.get('/linkedin/callback', (req, res, next) => {
  passport.authenticate('linkedin', (errr, user) => {
    if (errr) {
      // failureRedirect
      return res.redirect(`${CLIENT_URL}/login`);
    }

    if (!user) {
      // failureRedirect
      return res.redirect(`${CLIENT_URL}/login`);
    }

    res.redirect(`${CLIENT_URL}?jwt=${user}`);
  })(req, res, next);
});

router.get('/checkAuth', withAuth, (req, res) => {
  if (req && req.id)
    return res.json({ success: 1, message: 'User is authenticated' });
  return res.json({ success: 0, message: 'User is not authenticated' });
});

export default router;
