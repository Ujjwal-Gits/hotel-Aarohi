import { Router } from 'express';
import { getAllRooms, getRoomById, createRoom, updateRoom, updateRoomStatus, deleteRoom } from '../controllers/room.controller';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', upload.single('image'), createRoom);
router.put('/:id', upload.single('image'), updateRoom);
router.patch('/:id/status', updateRoomStatus);
router.delete('/:id', deleteRoom);

export default router;
