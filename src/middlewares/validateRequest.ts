import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError, ZodSchema } from "zod";

interface ValidationSchemas {
    body?: ZodSchema;
    params?: ZodSchema;
    query?: ZodSchema;
}

/**
 * Validates the request body, params, and query against the given Zod schemas.
 *
 * @param schemas - An object with the following properties:
 *   - `body`: A Zod schema for the request body
 *   - `params`: A Zod schema for the request params
 *   - `query`: A Zod schema for the request query
 * @returns A middleware function that validates the request and either
 *   - calls `next()` if the request is valid
 *   - returns a 400 response with a JSON object containing the validation errors
 *   - calls `next(err)` if the error is not a ZodError
 */
export const validateRequest = (schemas: ValidationSchemas) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: Record<string, Record<string, string>> = {};

        try {
            if (schemas.body) {
                const bodyResult = schemas.body.parse(req.body);
                req.body = bodyResult;
            }
            if (schemas.params) {
                const paramsResult = schemas.params.parse(req.params);
                req.params = paramsResult;
            }
            if (schemas.query) {
                const queryResult = schemas.query.parse(req.query);
                req.query = queryResult;
            }
            next();
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                err.errors.forEach((error) => {
                    const path = error.path[0] ?? "root";
                    const field = error.path.slice(1).join(".");

                    if (!errors[path]) {
                        errors[path] = {};
                    }
                    errors[path][field || "root"] = error.message;
                });

                return res.status(StatusCodes.BAD_REQUEST).json({
                    errors,
                    message: "Validation failed",
                });
            }

            next(err);
        }
    };
};
