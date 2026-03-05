import express from 'express';
import {
  createSample,
  getSample,
  updateSample,
  deleteSample
} from '../controllers/sampleController';

const router = express.Router();

/**
 * SAMPLE ROUTES
 * Replace "sample" names when implementing real routes.
 */

router.post('/', createSample);      // CREATE
router.get('/', getSample);          // READ
router.put('/:id', updateSample);    // UPDATE
router.delete('/:id', deleteSample); // DELETE

export default router;
