import { Router } from 'express';
import { InquiryController } from '../controllers/inquiry.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateInquiry } from '../validators/inquiry.validator';

const router = Router();
const inquiryController = new InquiryController();

router.get('/', inquiryController.getAll);
router.get('/:id', inquiryController.getById);
router.post('/', authMiddleware, validateInquiry, inquiryController.create);
router.put('/:id', authMiddleware, validateInquiry, inquiryController.update);
router.delete('/:id', authMiddleware, inquiryController.delete);

export default router;
