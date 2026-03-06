import { ErrorRequestHandler } from 'express';

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

  // TODO: add validation errors (400)

  if (err instanceof Error) {
    console.error(err.stack);
  }

  res.status(500).send('Internal Server Error');
};
