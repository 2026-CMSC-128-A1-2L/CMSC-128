import { Tag } from '../models/housing/Tag';

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
        name: 'number';
        min?: number | null;
        max?: number | null;
      };
};

export const createTag = async (data: CreateTagArguments) => {
  const newTag = new Tag(data);
  return await newTag.save();
};

export const getTags = async () => {
  return await Tag.find();
};
