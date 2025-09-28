const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 
      `API for managing books and authors.<br>
       <b>How to use protected endpoints:</b>
      <ol>
        <li>Authenticate via <a href="/auth/google" target="_blank">/auth/google</a>.</li>
        <li>Copy the JWT token shown after login.</li>
        <li>Click the <b>Authorize</b> button in Swagger UI and paste your token as <code>Bearer &lt;your-token&gt;</code>.</li>
      </ol>
      `

    },
    servers: [
      {
        url: 'https://library-api-rpui.onrender.com',
        description: 'Deployed API on Render'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
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
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};