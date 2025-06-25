import winston, { createLogger } from "winston";
import { config } from "../config/env.js";

const level = config.NODE_ENV === "production" ? "info" : "debug";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "blue",
    http: "magenta",
};

winston.addColors(colors);

// Console format with colors
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

// File format without colors
const fileFormat = winston.format.combine(winston.format.timestamp(), winston.format.json());

const logger = createLogger({
    level: level,
    levels: levels,
    format: winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" })), // base format, overridden in transports
    transports: [
        new winston.transports.Console({
            level: level,
            format: consoleFormat,
        }),
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: fileFormat,
        }),
        new winston.transports.File({
            filename: "logs/combined.log",
            format: fileFormat,
        }),
    ],
});

export default logger;
