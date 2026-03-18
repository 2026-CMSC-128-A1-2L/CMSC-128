import { ObjectIdSchema } from "./common";
import z from "zod";

export const CreateBookmarkParamsSchema = z.object({
  listingID: ObjectIdSchema,
});

export const DeleteBookmarkParamsSchema = z.object({
  listingID: ObjectIdSchema,
});
