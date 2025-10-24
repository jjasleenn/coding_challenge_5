// src/config/swagger.ts
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./swaggerOptions";

const swaggerSpec = swaggerJSDoc(swaggerOptions);

/**
 * Helper to mount swagger UI in the express app
 * usage: app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
 */
export { swaggerUi, swaggerSpec };
