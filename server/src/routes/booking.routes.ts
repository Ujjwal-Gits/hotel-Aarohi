import { Router } from 'express';
import { getAllBookings, updateBookingStatus, deleteBooking } from '../controllers/booking.controller';

const router = Router();

router.get('/', getAllBookings);
router.patch('/:id/status', updateBookingStatus);
router.delete('/:id', deleteBooking);

export default router;
