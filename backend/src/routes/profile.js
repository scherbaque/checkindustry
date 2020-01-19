import express from 'express';
import * as profileController from '../controllers/profile';
import withAuth from '../middleware/auth';

const router = express.Router();

router.get('/', withAuth, profileController.getProfile);

router.get(
  '/industry/:industryTitle',
  withAuth,
  profileController.getSimilarIndustries
);

router.put('/preference', withAuth, profileController.setPreferences);

export default router;
