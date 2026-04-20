import { RequestHandler } from 'express';
import {
  ObjectIdSchema,
  ResolveReportBodySchema,
  ReportListingBodySchema,
  ReportUserBodySchema,
} from 'shared';
import { getReports, resolveReport, reportListing, reportUser } from './report.service';

export const routeGetReports: RequestHandler = async (req, res, next) => {
  const reports = await getReports();
  res.status(200).json({ data: reports });
};

export const routeResolveReport: RequestHandler = async (req, res, next) => {
  const reportId = ObjectIdSchema.parse(req.params.reportId);
  const body = ResolveReportBodySchema.parse(req.body);

  const resolved = await resolveReport(reportId, body);
  res.status(200).json({ data: resolved });
};

export const routeReportListing: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);
  const body = ReportListingBodySchema.parse(req.body);

  const report = await reportListing({
    userId: req.user!._id,
    listingId: listingId,
    ...body,
  });

  res.status(201).json({ id: report.id });
};

export const routeReportUser: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);
  const body = ReportUserBodySchema.parse(req.body);

  const report = await reportUser({
    userId: req.user!._id,
    userReported: userId,
    ...body,
  });

  res.status(201).json({ id: report.id });
};
