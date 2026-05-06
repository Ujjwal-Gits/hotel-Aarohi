import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import fs from 'fs';
import path from 'path';

export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await prisma.room.findMany({
            include: { hotel: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
};

export const getRoomById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const room = await prisma.room.findUnique({
            where: { id },
            include: { hotel: true, bookings: true },
        });
        if (!room) {
            res.status(404).json({ error: 'Room not found' });
            return;
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch room' });
    }
};

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { name, type, description, specialFeatures, price, capacity, hotelId, roomStatus } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const room = await prisma.room.create({
            data: {
                name: name || 'Unnamed Room',
                type,
                description: description || null,
                specialFeatures: specialFeatures || null,
                imageUrl,
                price: parseFloat(price),
                capacity: parseInt(capacity),
                hotelId,
                roomStatus: roomStatus || 'AVAILABLE',
            },
        });

        // Create a notification for the new room
        await prisma.notification.create({
            data: {
                message: `New room "${room.name}" has been created`,
                type: 'success',
                entityType: 'room',
                entityId: room.id,
            },
        });

        res.status(201).json(room);
    } catch (error) {
        console.error('Room Create Error:', error);
        res.status(400).json({ error: 'Failed to create room' });
    }
};

export const updateRoom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, type, description, specialFeatures, price, capacity, available, roomStatus } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

        // If uploading a new image, get the old one to delete
        if (imageUrl) {
            const oldRoom = await prisma.room.findUnique({ where: { id } });
            if (oldRoom?.imageUrl) {
                const oldPath = path.join(__dirname, '..', '..', oldRoom.imageUrl);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
        }

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (type !== undefined) updateData.type = type;
        if (description !== undefined) updateData.description = description;
        if (specialFeatures !== undefined) updateData.specialFeatures = specialFeatures;
        if (price !== undefined) updateData.price = parseFloat(price);
        if (capacity !== undefined) updateData.capacity = parseInt(capacity);
        if (available !== undefined) updateData.available = available === 'true' || available === true;
        if (roomStatus !== undefined) updateData.roomStatus = roomStatus;
        if (imageUrl) updateData.imageUrl = imageUrl;

        const room = await prisma.room.update({
            where: { id },
            data: updateData,
        });

        await prisma.notification.create({
            data: {
                message: `Room "${room.name}" has been updated`,
                type: 'info',
                entityType: 'room',
                entityId: room.id,
            },
        });

        res.json(room);
    } catch (error) {
        console.error('Room Update Error:', error);
        res.status(404).json({ error: 'Room not found' });
    }
};

export const updateRoomStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { roomStatus } = req.body;

        const room = await prisma.room.update({
            where: { id },
            data: { roomStatus },
        });

        await prisma.notification.create({
            data: {
                message: `Room "${room.name}" status changed to ${roomStatus}`,
                type: roomStatus === 'AVAILABLE' ? 'success' : roomStatus === 'BOOKED' ? 'warning' : 'info',
                entityType: 'room',
                entityId: room.id,
            },
        });

        res.json(room);
    } catch (error) {
        res.status(404).json({ error: 'Room not found' });
    }
};

export const deleteRoom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const room = await prisma.room.findUnique({ where: { id } });

        if (room?.imageUrl) {
            const imgPath = path.join(__dirname, '..', '..', room.imageUrl);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }

        await prisma.room.delete({ where: { id } });

        await prisma.notification.create({
            data: {
                message: `Room "${room?.name}" has been deleted`,
                type: 'error',
                entityType: 'room',
                entityId: id,
            },
        });

        res.json({ message: 'Success' });
    } catch (error) {
        res.status(404).json({ error: 'Room not found' });
    }
};
