import "reflect-metadata";
import express, { NextFunction, Response, Request } from "express";
import swaggerUi from "swagger-ui-express";
import "express-async-errors";

import { router } from "./routes";
import swaggerFile from "../../../swagger.json";

import createConnection from "@shared/infra/typeorm";

import "../../container";
import { AppError } from "@shared/errors/AppError";

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

export { app };