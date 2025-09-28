const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
  // Generate JWT
    const token = jwt.sign(
      { id: req.user.id, displayName: req.user.displayName, email: req.user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );
    // Send token as JSON (or redirect with token as query param)
    res.json({ token });
    }
  );
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});


router.get('/me', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});



module.exports = router;
