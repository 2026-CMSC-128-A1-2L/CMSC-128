import { RequestHandler } from 'express';
import z from 'zod';
import { createTag, CreateTagArguments, getTags } from '../services/tag';

export const routeCreateTag: RequestHandler = async (req, res, next) => {
  const createTagParamsSchema = z.object({
    name: z.string(),
    displayName: z.string(),
    isRequired: z.boolean(),
    dataType: z.discriminatedUnion('name', [
      z.object({
        name: z.literal('enum'),
        values: z.array(z.string()),
      }),
      z.object({
        name: z.literal('boolean'),
      }),
      z.object({
        name: z.literal('number'),
        min: z.number(),
        max: z.number(),
      }),
    ]),
  });

  const params: CreateTagArguments = createTagParamsSchema.parse(req.body);
  res.status(201).send({ data: await createTag(params) });
};

export const routeGetTags: RequestHandler = async (req, res, next) => {
  res.status(200).send({ data: await getTags() });
};
