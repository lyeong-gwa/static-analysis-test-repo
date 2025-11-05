import { Router } from 'express';
import { InquiryController } from '../controllers/inquiry.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const inquiryController = new InquiryController();

router.get('/', inquiryController.getAll);
router.get('/:id', inquiryController.getById);
router.post('/', authMiddleware, inquiryController.create);
router.put('/:id', authMiddleware, inquiryController.update);
router.delete('/:id', authMiddleware, inquiryController.delete);

export default router;
