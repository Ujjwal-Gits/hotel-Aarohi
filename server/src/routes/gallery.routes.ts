import { Router } from 'express';
import { getAllGallery, createGallery, updateGallery, deleteGallery } from '../controllers/gallery.controller';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getAllGallery);
router.post('/', upload.single('image'), createGallery);
router.put('/:id', upload.single('image'), updateGallery);
router.delete('/:id', deleteGallery);

export default router;
