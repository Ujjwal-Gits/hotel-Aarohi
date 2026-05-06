import { Router } from 'express';
import { getAllNotifications, getUnreadCount, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications } from '../controllers/notification.controller';

const router = Router();

router.get('/', getAllNotifications);
router.get('/unread-count', getUnreadCount);
router.patch('/:id/read', markAsRead);
router.patch('/mark-all-read', markAllAsRead);
router.delete('/clear-all', clearAllNotifications);
router.delete('/:id', deleteNotification);

export default router;
