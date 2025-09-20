const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'API for managing books and authors',
    },
    servers: [
  {
    url: 'https://library-api-gideon.onrender.com',
    description: 'Live Render server'
  }
],
    components: {
      schemas: {
        Book: {
          type: 'object',
          required: ['title', 'author', 'genre', 'isbn', 'pages', 'publishedDate', 'summary'],
          properties: {
            title: { type: 'string', example: 'The Alchemist' },
            author: { type: 'string', example: 'Paulo Coelho' },
            genre: { type: 'string', example: 'Fiction' },
            isbn: { type: 'string', example: '9780061122415' },
            pages: { type: 'integer', example: 208 },
            publishedDate: { type: 'string', format: 'date', example: '1988-04-15' },
            summary: { type: 'string', example: 'A journey of self-discovery.' }
          }
        },
        Author: {
          type: 'object',
          required: ['name', 'birthdate', 'nationality'],
          properties: {
            name: { type: 'string', example: 'Chinua Achebe' },
            birthdate: { type: 'string', format: 'date', example: '1930-11-16' },
            nationality: { type: 'string', example: 'Nigerian' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
