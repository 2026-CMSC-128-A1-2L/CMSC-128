import mongoose from 'mongoose';
import { Listing } from '../models/housing/Listing.js';
import { AppError } from '../controllers/error.js';

export type CreateListingArguments = {
  housingID: mongoose.Types.ObjectId; 
  tags?: string[];    // Tags are optional (note please add type to tag in listing schema) 

  roomType: string;
  capacity: number;

  isPrivate: boolean;
  allowVisit: boolean;
  allowTransfer: boolean;
  description: string;
  mediaUrls?: string; // Optional
  units: string[];
};

export const createFacility = async(data: CreateListingArguments) => {
  const newListing = new Listing({
    housingID: data.housingID,      
    tags: data.tags ?? [],  // returns empty array if no tags are given

    roomType: data.roomType,
    capacity: data.capacity,

    isPrivate: data.isPrivate,
    allowVisit: data.allowVisit,
    allowTransfer: data.allowTransfer,

    description: data.description,
    mediaUrls: data.mediaUrls ?? [], 
    units: data.units
  })
  return await newListing.save();
};
