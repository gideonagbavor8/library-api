const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, displayName: req.user.displayName, email: req.user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );
    res.send(`
      <h2>Authentication Successful!</h2>
      <p>Copy the JWT token below and click <a href="/api-docs" target="_blank">here</a> to open the API docs.</p>
      <textarea rows="6" cols="80" readonly>${token}</textarea>
      <ol>
        <li>Copy the token above.</li>
        <li>Go to <a href="/api-docs" target="_blank">Swagger UI</a>.</li>
        <li>Click the <b>Authorize</b> button at the top right.</li>
        <li>Paste your token as <code>Bearer &lt;your-token&gt;</code> and click <b>Authorize</b>.</li>
        <li>Now you can use the protected endpoints!</li>
      </ol>
    `);
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
