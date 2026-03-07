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
  mediaUrls?: string[]; // Optional
  units: string[];
};

// Parameters for flithering listings (Please review for which fields are relevant for filtering)
export type GetListingArguments = {
  housingID: mongoose.Types.ObjectId; 
  tags?: string[];     
  units: string[];
  isPrivate: boolean;
  allowVisit: boolean;
  allowTransfer: boolean;
  capacity: number;
}

export const createListing = async(data: CreateListingArguments) => {
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

export const getListings = async(filters: GetListingArguemnts) => {
  
  const query:any = {}; // Changes depending on filter
  
  // Only 1 is made for now so that this may be reviewed 
  
  if(filters.housingID){ // Checks if housing id was inputed in filters
    query.housingID = filters.housingID;
  }
  
  return await Listing.find(query); //returns listings
}

export const getListingById = async(id: mongoose.Types.ObjectId) => {
  return await Listing.findById(id);
}