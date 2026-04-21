import type { ErrorRequestHandler } from 'express';
import { MongoServerError } from 'mongodb';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    if (err.details) {
      res.status(err.statusCode).send({
        error: {
          message: err.message,
        },
      });
    } else {
      res.status(err.statusCode).send({
        error: {
          message: err.message,
          details: err.details,
        },
      });
    }

    return;
  }

  if (err instanceof ZodError) {
    res.status(400).send({ error: err.issues });

    return;
  }

  if (err instanceof MongoServerError) {
    // Error code for DuplicateKey https://www.mongodb.com/docs/manual/reference/error-codes/
    if (err.code == 11000) {
      const dupKeyError = err.errorResponse as {
        keyValue: Record<string, string>;
      };
      const keys = Object.keys(dupKeyError.keyValue);
      let message: string;
      if (keys.length == 1) {
        message = `Parameter "${keys[0]}" received a duplicate value ${dupKeyError.keyValue[keys[0]]}`;
      } else {
        // TODO: make this more detailed
        message = `Received duplicate values`;
      }
      return res.status(409).send({ error: message });
    }
  }

  if (err instanceof Error) {
    console.error(err.stack);
  }

  res.status(500).send('Internal Server Error');
};
