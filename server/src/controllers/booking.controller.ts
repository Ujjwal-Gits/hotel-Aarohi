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
// Retrieves all bookings from the database, including user and room details, and returns them in descending order of creation.

export const updateBookingStatus = async (req: Request, res: Response) => {
    // Updates the status of a specific booking based on the provided booking ID and new status value.
    try {
        let { id } = req.params;
        if (Array.isArray(id)) id = id[0];
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
        let { id } = req.params;
        if (Array.isArray(id)) id = id[0];
        await prisma.booking.delete({ where: { id } });
        res.json({ message: 'Success' });
    } catch (error) {
        res.status(404).json({ error: 'Booking not found' });
    }
};
