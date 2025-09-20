const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { swaggerUi, swaggerSpec } = require('./swagger');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');

app.use('/books', bookRoutes);
// app.use('/authors', authorRoutes);

// const authorRoutes = require('./routes/authors');
app.use('/authors', authorRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });



