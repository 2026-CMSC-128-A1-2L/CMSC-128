import { Router } from 'express';
import { isSuperAdmin } from '../../middleware';
import { routeGetReports, routeGetReport, routeResolveReport } from './report.controller';

const router = Router();

// GET /api/reports
// Returns all reports. Admin only.
router.get('/', isSuperAdmin, routeGetReports);

// GET /api/reports/:reportId
// Returns a single report. Admin only.
router.get('/:reportId', isSuperAdmin, routeGetReport);

// POST /api/reports/:reportId/resolve
// Resolves or dismisses a report. Admin only.
router.post('/:reportId/resolve', isSuperAdmin, routeResolveReport);

export default router;
