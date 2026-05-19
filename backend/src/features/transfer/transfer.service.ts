import type mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { AppError } from '../../error.js';
import { combineFilters } from '../../middleware.js';
import { File } from '../file/file.model.js';
import { HousingFacility } from '../facility/facility.model.js';
import { Listing, type ListingType } from '../listing/listing.model.js';
import { Rental } from '../rental/rental.model.js';
import { Unit } from '../unit/unit.model.js';
import {
  TransferRequest,
  type TransferRequestType,
  type TransferStatus,
} from './transfer.model.js';

export const getTransferRequests = async (userId: mongoose.Types.ObjectId) => {
  return await TransferRequest.find({ userId });
};

const populateTransferRequest = () => [
  {
    path: 'userId',
    select: 'firstName middleName lastName emails email contact address profilePicture',
  },
  {
    path: 'unitId',
    select: 'roomNumber price listingId facilityId',
    populate: [
      { path: 'facilityId', select: 'name' },
      { path: 'listingId', select: 'roomType' },
    ],
  },
];

const getPasaloLeaseDuration = (
  startDate?: Date | null,
  endDate?: Date | null,
): '6-months' | '12-months' => {
  if (!startDate || !endDate) return '12-months';

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  return months > 0 && months <= 6 ? '6-months' : '12-months';
};

const formatDateOnly = (date?: Date | null) => {
  if (!date) return undefined;
  return date.toISOString().slice(0, 10);
};

export const getManagedTransferRequests = async (
  filters: QueryFilter<{ facilityId: mongoose.Types.ObjectId }>,
  status?: string,
) => {
  const units = await Unit.find(filters).select('_id');
  const unitIds = units.map((unit) => unit._id);

  if (unitIds.length === 0) return [];

  const query: QueryFilter<TransferRequestType> = {
    unitId: { $in: unitIds },
  };
  if (status) query.status = status as TransferStatus;

  return await TransferRequest.find(query)
    .populate(populateTransferRequest())
    .sort({ createdAt: -1, _id: -1 })
    .lean();
};

export const getManagedTransferRequestById = async (
  transferID: mongoose.Types.ObjectId,
  filters: QueryFilter<{ facilityId: mongoose.Types.ObjectId }>,
) => {
  const units = await Unit.find(filters).select('_id');
  const unitIds = units.map((unit) => unit._id);

  if (unitIds.length === 0) return null;

  return await TransferRequest.findOne({
    _id: transferID,
    unitId: { $in: unitIds },
  })
    .populate(populateTransferRequest())
    .lean();
};

export const createTransferRequest = async (
  userId: mongoose.Types.ObjectId,
  unitId: mongoose.Types.ObjectId,
  data: {
    reasonCategory?: string;
    intendedTransferDate?: Date;
    description?: string;
    transferFee?: number;
    depositHandling?: string;
    advanceRentStatus?: string;
    documents?: {
      docId: string;
      name: string;
      fileIds: string[];
    }[];
    termsAccepted?: boolean;
  } = {},
) => {
  const unit = await Unit.findById(unitId);
  if (!unit) {
    throw new AppError(404, 'Unit not found.');
  }

  const facility = await HousingFacility.findById(unit.facilityId);
  if (!facility) throw new AppError(404, 'Facility not found.');
  if (!facility.allowTransfer) {
    throw new AppError(422, 'Pasalo is not available for this property.');
  }

  const activeRental = await Rental.findOne({
    userId,
    unitId,
    status: { $in: ['active', 'inactive'] },
  });
  if (!activeRental) {
    throw new AppError(403, 'Only the current tenant can request a pasalo transfer.');
  }

  const existing = await TransferRequest.findOne({
    userId,
    unitId,
    status: { $in: ['pending', 'approved'] },
  });
  if (existing) {
    throw new AppError(422, 'You already have an active pasalo request for this unit.');
  }

  const uniqueFileIds = [...new Set(data.documents?.flatMap((doc) => doc.fileIds) ?? [])];
  if (uniqueFileIds.length > 0) {
    const ownedFileCount = await File.countDocuments({ key: { $in: uniqueFileIds }, userId });
    if (ownedFileCount !== uniqueFileIds.length) {
      throw new AppError(422, 'One or more uploaded files were not found.');
    }
  }

  return await new TransferRequest({
    userId,
    unitId,
    reasonCategory: data.reasonCategory,
    intendedTransferDate: data.intendedTransferDate,
    description: data.description,
    transferFee: data.transferFee,
    depositHandling: data.depositHandling,
    advanceRentStatus: data.advanceRentStatus,
    leaseStartDate: activeRental.actualMoveInDate ?? activeRental.expectedMoveInDate,
    leaseEndDate: activeRental.actualMoveOutDate ?? activeRental.expectedMoveOutDate,
    documents:
      data.documents?.map((doc) => ({
        docId: doc.docId,
        name: doc.name,
        status: 'pending',
        files: [...new Set(doc.fileIds)],
      })) ?? [],
    status: 'pending',
    termsAccepted: data.termsAccepted ?? false,
  }).save();
};

export const getApprovedPasaloListings = async () => {
  const transfers = await TransferRequest.find({ status: 'approved' })
    .populate('unitId')
    .lean();

  const cards = [];
  for (const transfer of transfers) {
    const unit = transfer.unitId as unknown as {
      _id: mongoose.Types.ObjectId;
      listingId: mongoose.Types.ObjectId;
      facilityId: mongoose.Types.ObjectId;
      price?: number;
    };
    if (!unit) continue;
    const [listing, facility] = await Promise.all([
      Listing.findById(unit.listingId).lean(),
      HousingFacility.findById(unit.facilityId).lean(),
    ]);
    if (!listing || !facility) continue;

    const media = facility.media?.[0]?.value ?? listing.media?.[0]?.value;
    const tags =
      listing.tags instanceof Map ? Object.fromEntries(listing.tags) : (listing.tags ?? {});
    const roomLabel =
      typeof tags.roomLabel === 'string'
        ? tags.roomLabel
        : `${listing.roomType[0].toUpperCase()}${listing.roomType.slice(1)}`;

    cards.push({
      id: facility._id.toString(),
      name: facility.name,
      rating: (listing.reviewCount ? listing.qualityAvg : 0).toFixed(1),
      price: { min: unit.price ?? 0, max: unit.price ?? 0 },
      location: facility.location.text,
      image: media ?? 'https://placehold.co/280x120?text=No+image',
      isPasalo: true,
      transferId: transfer._id.toString(),
      pasaloUnitId: unit._id.toString(),
      pasaloListingId: listing._id.toString(),
      pasaloMoveInDate: formatDateOnly(transfer.intendedTransferDate),
      pasaloLeaseDuration: getPasaloLeaseDuration(
        transfer.intendedTransferDate,
        transfer.leaseEndDate,
      ),
      room_types: [
        {
          id: listing._id.toString(),
          pax: roomLabel,
          price: unit.price ?? 0,
          unitCount: 1,
          availableUnitCount: 1,
        },
      ],
    });
  }

  return cards;
};

export const getApprovedPasaloTransfer = async (transferID: mongoose.Types.ObjectId) => {
  const transfer = await TransferRequest.findOne({ _id: transferID, status: 'approved' })
    .populate(populateTransferRequest())
    .lean();
  if (!transfer) return null;

  return {
    ...transfer,
    isPasalo: true,
    pasaloMoveInDate: formatDateOnly(transfer.intendedTransferDate),
    pasaloLeaseDuration: getPasaloLeaseDuration(
      transfer.intendedTransferDate,
      transfer.leaseEndDate,
    ),
  };
};

export const cancelTransferRequest = async (
  transferID: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
) => {
  const transfer = await TransferRequest.findOne({ _id: transferID, userId });
  if (!transfer) {
    throw new AppError(404, 'Transfer request not found.');
  }
  if (transfer.status !== 'pending') {
    throw new AppError(422, 'Only pending transfer requests can be cancelled.');
  }

  transfer.status = 'cancelled';
  return await transfer.save();
};

export const approveTransferRequest = async (
  transferID: mongoose.Types.ObjectId,
  filters: QueryFilter<ListingType>,
) => {
  const transfer = await TransferRequest.findById(transferID);

  if (!transfer) {
    throw new AppError(404, 'Transfer request not found.');
  }

  const unit = await Unit.findById(transfer.unitId);
  if (!unit) {
    throw new AppError(404, 'Unit not found.');
  }

  const listing = await Listing.findOne(combineFilters({ _id: unit.listingId }, filters));

  if (!listing) {
    throw new AppError(403, 'Forbidden.');
  }

  transfer.status = 'approved';

  return await transfer.save();
};

export const rejectTransferRequest = async (
  transferID: mongoose.Types.ObjectId,
  filters: QueryFilter<ListingType>,
) => {
  const transfer = await TransferRequest.findById(transferID);

  if (!transfer) {
    throw new AppError(404, 'Transfer request not found.');
  }

  const unit = await Unit.findById(transfer.unitId);
  if (!unit) {
    throw new AppError(404, 'Unit not found.');
  }

  const listing = await Listing.findOne(combineFilters({ _id: unit.listingId }, filters));

  if (!listing) {
    throw new AppError(403, 'Forbidden.');
  }

  transfer.status = 'rejected';

  return await transfer.save();
};
