import { ErrorRequestHandler } from 'express';
import { MongoError, MongoServerError } from 'mongodb';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).send(err.message);

    return;
  }

  if (err instanceof ZodError) {
    res.status(400).send(err.issues);

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
