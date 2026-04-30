import { AppError } from '../../error.js';
import { combineFilters } from '../../middleware.js';
import { Tag } from './tag.model.js';

export type CreateTagArguments = {
  name: string;
  displayName: string;
  isRequired: boolean;
  dataType:
    | {
        name: 'enum';
        values: string[];
      }
    | {
        name: 'boolean';
      }
    | {
        name: 'numeric';
        min?: number | null;
        max?: number | null;
      };
};

// alomost same as create, but not allowed to change name, and all fields are optional
export type UpdateTagArguments = {
  displayName?: string;
  isRequired?: boolean;
  dataType?:
    | {
        name: 'enum';
        values: string[];
      }
    | {
        name: 'numeric';
        min?: number | null;
        max?: number | null;
      }
    | {
        name: 'boolean';
      };
};

// simple create funciton for tags
// admin capability, can be used to create new valid tags with formats for UI
export const createTag = async (data: CreateTagArguments) => {
  // check if enumarated tags have values and if numeric tags have valid min and max
  if (data.dataType.name === 'enum') {
    if (!data.dataType.values || data.dataType.values.length === 0) {
      throw new AppError(422, 'Enum tags must provide at least one value.');
    }
  }

  if (data.dataType.name === 'numeric') {
    if (
      data.dataType.min != null &&
      data.dataType.max != null &&
      data.dataType.max < data.dataType.min
    ) {
      throw new AppError(422, 'Max cannot be smaller than min.');
    }
  }

  // check if tag already exists
  const existing = await Tag.findOne({ name: data.name });
  if (existing) {
    throw new AppError(409, 'Tag with this name already exists.');
  }

  // create new tag
  const newTag = new Tag({
    name: data.name,
    displayName: data.displayName,
    isRequired: data.isRequired ?? false,
    dataType: data.dataType,
  });

  // save new tag
  return await newTag.save();
};

// simple get function for tags, just call all tags
// can be used to get all valid tags for listing creation and UI format
export const getTags = async () => {
  return await Tag.find();
};

// update function
export const updateTag = async (tagName: string, data: UpdateTagArguments, filters: any) => {
  // check if the tag exists
  const tag = await Tag.findOne(combineFilters(filters, { name: tagName }));

  // if the tag doesn't exist, check it without filters
  if (!tag) {
    const tagNoFilter = await Tag.findOne({ name: tagName });

    // if tag exists without filters, then it's a 403, otherwise it's a 404
    if (tagNoFilter) {
      throw new AppError(403, 'Forbidden: cannot update this tag.');
    } else {
      throw new AppError(404, 'Tag not found.');
    }
  }

  if (data.dataType) {
    // ensure that the new data type is valid and provided values are also valid
    if (
      data.dataType.name === 'enum' &&
      (!data.dataType.values || data.dataType.values.length === 0)
    ) {
      throw new AppError(422, 'Enum tags must provide at least one value.');
    }

    if (
      data.dataType.name === 'numeric' &&
      data.dataType.min != null &&
      data.dataType.max != null &&
      data.dataType.max < data.dataType.min
    ) {
      throw new AppError(422, 'Max cannot be smaller than min.');
    }
  }

  // TODO: check if any listing uses the tag
  // for enums, check if any dorm uses the values

  // update the tag with the new data
  tag.set(data);

  // save the tag
  return await tag.save();
};

// simple delete function for tags, just delete by name
// may not be used often, but can be used by admins to remove invalid or outdated tags from the system
export const deleteTag = async (tagName: string) => {
  const tag = await Tag.findOne({ name: tagName });

  if (!tag) {
    throw new AppError(404, 'Tag not found.');
  }

  // TODO: check if any listing uses the tag
  await tag.deleteOne();
};

// Given a record of tag internal names to their stored values, returns enriched
// tag objects including displayName and dataType for each tag found in the database.
//
// Intended to be called directly by the client via POST /api/tags/enrich, passing
// a listing's raw tags map. Tags not found in the database are silently omitted.
export const enrichTags = async (tags: Record<string, string | number | boolean>) => {
  const names = Object.keys(tags);
  if (names.length === 0) return [];

  const tagDocs = await Tag.find({ name: { $in: names } }).lean();

  return tagDocs.map((tag) => ({
    name: tag.name,
    displayName: tag.displayName,
    dataType: tag.dataType,
    value: tags[tag.name],
  }));
};
