
const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Content Moderation Service API",
      version: "1.0.0",
      description:
        "API for content moderation and user management (moderation endpoints).",
      contact: {
        name: "Development Team",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local development server (v1)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT Bearer token in format `Bearer <token>`",
        },
      },
      schemas: {
        Post: {
          type: "object",
          properties: {
            id: { type: "string", example: "post_123" },
            content: { type: "string", example: "Sample post content here..." },
            author: { type: "string", example: "user_456" },
            isFlagged: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time", example: "2023-10-01T12:34:56Z" },
            updatedAt: { type: "string", format: "date-time", example: "2023-10-02T08:00:00Z" }
          },
          required: ["id", "content", "author"]
        },
        UserProfile: {
          type: "object",
          properties: {
            id: { type: "string", example: "user_456" },
            username: { type: "string", example: "sampleUser123" },
            bio: { type: "string", example: "This is a sample bio for the user profile." },
            isFlagged: { type: "boolean", example: false },
            joinedAt: { type: "string", format: "date-time", example: "2023-01-15T09:00:00Z" },
            postsCount: { type: "integer", example: 45 }
          },
          required: ["id", "username"]
        },
        ModerateResponse: {
          type: "object",
          properties: {
            id: { type: "string", example: "post_123" },
            status: { type: "string", example: "Moderated" },
            actionTaken: { type: "string", example: "Content flagged and hidden" },
            moderatedAt: { type: "string", format: "date-time", example: "2025-10-23T18:00:00Z" }
          }
        },
        FlagUserRequest: {
          type: "object",
          properties: {
            reason: { type: "string", example: "Spam" }
          },
          required: ["reason"]
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Resource not found" },
            code: { type: "integer", example: 404 }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }],
  },
  // swagger-jsdoc will scan these files for JSDoc/OpenAPI comments (adjust path as needed)
  apis: ["./src/api/v1/routes/*.ts"]
};

export default swaggerOptions;
