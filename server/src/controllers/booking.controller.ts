import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                user: { select: { name: true, email: true } },
                room: { select: { type: true, hotel: { select: { name: true } } } }
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};
    // This is a sample comment added for demonstration purposes.

export const updateBookingStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const booking = await prisma.booking.update({
            where: { id },
            data: { status },
        });
        res.json(booking);
    } catch (error) {
        res.status(404).json({ error: 'Booking not found' });
    }
};

export const deleteBooking = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.booking.delete({ where: { id } });
        res.json({ message: 'Success' });
    } catch (error) {
        res.status(404).json({ error: 'Booking not found' });
    }
};
