import { RequestHandler } from 'express';
import z from 'zod';
import { createTag, CreateTagArguments, deleteTag, getTags, updateTag } from '../services/tag';

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

// route for updating tads, can update display name, required status, and data type
export const routeUpdateTag: RequestHandler = async (req, res, next) => {
  // discriminated union for data type
  const DataTypeSchema = z.discriminatedUnion("name", [
    z.object({
      name: z.literal("enum"),
      values: z.array(z.string()).min(1)
    }),
    z.object({
      name: z.literal("numeric"),
      min: z.number().optional(),
      max: z.number().optional()
    }),
    z.object({
      name: z.literal("boolean")
    })
  ]);

  // zod schema for params
  const ParamsSchema = z.object({
    displayName: z.string().optional(),
    isRequired: z.boolean().optional(),
    dataType: DataTypeSchema.optional()
  });

  // parse params
  const tagName = z.string().parse(req.params.tagName);
  const updateData = ParamsSchema.parse(req.body);

  // send to service
  const updatedTag = await updateTag(
    tagName,
    updateData,
    res.locals.filters ?? {}
  );

  res.status(200).json({
    data: updatedTag
  });

};

export const routeDeleteTag: RequestHandler = async (req, res, next) => {

  const tagName = z.string().parse(req.params.tagName);

  await deleteTag(tagName);

  res.status(200).json({
    message: "Tag deleted successfully"
  });

};