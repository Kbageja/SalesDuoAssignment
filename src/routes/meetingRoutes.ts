import { Router } from 'express';
import { MeetingController } from '../controllers/meetingControllers';
import { upload } from '../middlewares/uploadmiddleware';

const router = Router();
const meetingController = new MeetingController();

// Health check endpoint
router.get('/health', meetingController.healthCheck);

// Main endpoint - accepts both file upload and text body
router.post(
  '/process-meeting',
  upload.single('file'),
  meetingController.processMeeting
);

export default router;