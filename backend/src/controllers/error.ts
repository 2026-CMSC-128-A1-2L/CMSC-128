import { ErrorRequestHandler } from 'express';
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

  if (err instanceof Error) {
    console.error(err.stack);
  }

  res.status(500).send('Internal Server Error');
};
