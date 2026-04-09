import { Router } from 'express';
import { isSuperAdmin } from '../../middleware';
import { routeGetReports, routeResolveReport } from './report.controller';

const router = Router();

// GET /api/reports
router.get('/reports', isSuperAdmin, routeGetReports);
// POST /api/reports/:reportId/resolve
router.post('/reports/:reportId/resolve', isSuperAdmin, routeResolveReport);

export default router;
