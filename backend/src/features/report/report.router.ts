import { Router } from 'express';
import { isSuperAdmin } from '../../middleware';
import { routeGetReports, routeResolveReport } from './report.controller';

const router = Router();

// GET /api/reports
router.get('/', isSuperAdmin, routeGetReports);
// POST /api/reports/:reportId/resolve
router.post('/:reportId/resolve', isSuperAdmin, routeResolveReport);

export default router;
