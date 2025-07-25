import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "./config/env.js";
import logger from "./utils/logger.js";
import appRoutes from "./routes/index.js";

const app: Express = express();

// Core middleware
app.use(helmet());
app.use(
    cors({
        origin: config.CORS_ORIGIN,
        credentials: true,
    }),
);

// Body parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(
    morgan(config.NODE_ENV === "production" ? "combined" : "dev", {
        stream: {
            write: (message: string) => logger.http(message.trim()),
        },
    }),
);

// App Routes
app.use("/api/v1", appRoutes);

// Error handling middleware
// TODO: Implement custom error handling middleware

export default app;
