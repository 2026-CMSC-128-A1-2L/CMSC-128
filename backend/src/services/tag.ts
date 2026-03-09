import { Tag } from '../models/housing/Tag';
import { AppError } from '../controllers/error';
import { combineFilters } from '../controllers/middleware';

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
        values: string[] 
      }
    | {  
        name: 'numeric'; 
        min?: number | null; 
        max?: number | null 
      }
    | { 
        name: 'boolean' 
      };
};

// simple create funciton for tags
// admin capability, can be used to create new valid tags with formats for UI
export const createTag = async (data: CreateTagArguments) => {
  // check if enumarated tags have values and if numeric tags have valid min and max
  if (data.dataType.name === "enum") {
    if (!data.dataType.values || data.dataType.values.length === 0) {
      throw new AppError(422, "Enum tags must provide at least one value.");
    }
  }

  if (data.dataType.name === "numeric") {
    if (
      data.dataType.min != null &&
      data.dataType.max != null &&
      data.dataType.max < data.dataType.min
    ) {
      throw new AppError(422, "Max cannot be smaller than min.");
    }
  }

  // check if tag already exists
  const existing = await Tag.findOne({ name: data.name });
  if (existing) {
    throw new AppError(409, "Tag with this name already exists.");
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
export const updateTag = async (
  tagName: string,
  data: UpdateTagArguments,
  filters: any
) => {

  // check if the tag exists
  const tag = await Tag.findOne(combineFilters({ name: tagName }, filters));

  // if the tag doesn't exist, check it without filters
  if (!tag) {
    const tagNoFilter = await Tag.findOne({ name: tagName });

    // if tag exists without filters, then it's a 403, otherwise it's a 404
    if (tagNoFilter) {
      throw new AppError(403, "Forbidden: cannot update this tag.");
    } else {
      throw new AppError(404, "Tag not found.");
    }
  }

  // if the tag exists, update it with the new data, but keep the old data if the new data is not provided
  const newDataType = data.dataType ?? tag.dataType;

  // ensure that the new data type is valid and provided values are also valid
  if (newDataType.name === "enum") {
    if (!newDataType.values || newDataType.values.length === 0) {
      throw new AppError(422, "Enum tags must provide at least one value.");
    }
  }

  if (
    newDataType.name === "numeric" &&
    newDataType.min != null &&
    newDataType.max != null &&
    newDataType.max < newDataType.min
  ) {
    throw new AppError(422, "Max cannot be smaller than min.");
  }

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
    throw new AppError(404, "Tag not found.");
  }

  await tag.deleteOne();

  return { message: "Tag deleted successfully." };
};
