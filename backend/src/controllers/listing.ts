import { RequestHandler } from 'express';

export const routeGetListings: RequestHandler = async (req, res, next) => {};
export const routeCreateListing: RequestHandler = async (req, res, next) => {};

export const routeGetListingById: RequestHandler = async (req, res, next) => {};
export const routeGetListingReviewsById: RequestHandler = async (req, res, next) => {};
export const routeUpdateListing: RequestHandler = async (req, res, next) => {};
export const routeDeleteListing: RequestHandler = async (req, res, next) => {};

export const routeGetUnitsByListing: RequestHandler = async (req, res, next) => {};
