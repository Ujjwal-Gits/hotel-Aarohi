import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllNotifications = async (req: Request, res: Response) => {
    try {
        const { unreadOnly } = req.query;
        const where = unreadOnly === 'true' ? { read: false } : {};

        const notifications = await prisma.notification.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 100, // Limit to last 100 notifications
        });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

export const getUnreadCount = async (req: Request, res: Response) => {
    try {
        const count = await prisma.notification.count({ where: { read: false } });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch unread count' });
    }
};

export const markAsRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notification = await prisma.notification.update({
            where: { id },
            data: { read: true },
        });
        res.json(notification);
    } catch (error) {
        res.status(404).json({ error: 'Notification not found' });
    }
};

export const markAllAsRead = async (req: Request, res: Response) => {
    try {
        await prisma.notification.updateMany({
            where: { read: false },
            data: { read: true },
        });
        res.json({ message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark notifications as read' });
    }
};

export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.notification.delete({ where: { id } });
        res.json({ message: 'Success' });
    } catch (error) {
        res.status(404).json({ error: 'Notification not found' });
    }
};

export const clearAllNotifications = async (req: Request, res: Response) => {
    try {
        await prisma.notification.deleteMany({});
        res.json({ message: 'All notifications cleared' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to clear notifications' });
    }
};
