import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const [
            bookingsCount,
            roomsCount,
            galleryCount,
            customersCount,
            availableRooms,
            bookedRooms,
            reservedRooms,
            unreadNotifications,
        ] = await Promise.all([
            prisma.booking.count(),
            prisma.room.count(),
            prisma.gallery.count(),
            prisma.customer.count(),
            prisma.room.count({ where: { roomStatus: 'AVAILABLE' } }),
            prisma.room.count({ where: { roomStatus: 'BOOKED' } }),
            prisma.room.count({ where: { roomStatus: 'RESERVED' } }),
            prisma.notification.count({ where: { read: false } }),
        ]);

        const recentNotifications = await prisma.notification.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
        });

        res.json({
            bookings: bookingsCount || 0,
            rooms: roomsCount || 0,
            gallery: galleryCount || 0,
            customers: customersCount || 0,
            roomStatus: {
                available: availableRooms,
                booked: bookedRooms,
                reserved: reservedRooms,
            },
            unreadNotifications,
            revenue: 45200, // Mock revenue - would come from a real calculation
            recentActivity: recentNotifications.map(n => ({
                id: n.id,
                message: n.message,
                type: n.type,
                entityType: n.entityType,
                entityId: n.entityId,
                time: getTimeAgo(n.createdAt),
                createdAt: n.createdAt,
            })),
        });
    } catch (error) {
        console.error('Stats Error:', error);
        res.status(500).json({ status: 'Error', message: 'Failed to fetch dashboard stats' });
    }
};

function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}
