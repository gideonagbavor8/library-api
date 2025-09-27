const dotenv = require('dotenv');
dotenv.config(); // Load environment variables at the very top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swagger');
const session = require('express-session');
const passport = require('passport');
require('./auth/passport'); // Passport configuration
const authRoutes = require('./routes/auth');

const app = express(); // Define app before using it
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false, // prevents empty sessions
  cookie: {
    secure: true, // true only if using HTTPS
    sameSite: 'none', // Allow cross-site cookies for OAuth
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.redirect('/api-docs');
});


app.get('/protected', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.send(`Welcome, ${req.user.displayName}! You are logged in.`);
  } else {
    res.status(401).send('Unauthorized: Please log in.');
  }
});



// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);

const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

module.exports = { ensureAuth };