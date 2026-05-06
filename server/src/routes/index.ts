import { Router } from 'express';
import dashboardRoutes from './dashboard.routes';
import galleryRoutes from './gallery.routes';
import roomRoutes from './room.routes';
import bookingRoutes from './booking.routes';
import customerRoutes from './customer.routes';
import notificationRoutes from './notification.routes';

const router = Router();

router.use('/dashboard', dashboardRoutes);
router.use('/gallery', galleryRoutes);
router.use('/listings', roomRoutes);
router.use('/bookings', bookingRoutes);
router.use('/customers', customerRoutes);
router.use('/notifications', notificationRoutes);

export default router;
