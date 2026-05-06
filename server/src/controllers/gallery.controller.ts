import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import fs from 'fs';
import path from 'path';

export const getAllGallery = async (req: Request, res: Response) => {
    try {
        const { category } = req.query;
        const where = category && category !== 'All' ? { category: category as string } : {};

        const images = await prisma.gallery.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch gallery images' });
    }
};

export const createGallery = async (req: Request, res: Response) => {
    try {
        const { title, category, description } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

        if (!imageUrl) {
            res.status(400).json({ error: 'Image is required' });
            return;
        }

        const newImage = await prisma.gallery.create({
            data: { title, imageUrl, category, description }
        });

        await prisma.notification.create({
            data: {
                message: `New gallery image "${title || 'Untitled'}" added`,
                type: 'success',
                entityType: 'gallery',
                entityId: newImage.id,
            },
        });

        res.status(201).json(newImage);
    } catch (error) {
        console.error('Gallery Create Error:', error);
        res.status(400).json({ error: 'Failed to add gallery image' });
    }
};

export const updateGallery = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, category, description } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

        // If uploading a new image, delete the old one
        if (imageUrl) {
            const oldImage = await prisma.gallery.findUnique({ where: { id } });
            if (oldImage?.imageUrl && oldImage.imageUrl.startsWith('/uploads/')) {
                const oldPath = path.join(__dirname, '..', '..', oldImage.imageUrl);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (category !== undefined) updateData.category = category;
        if (description !== undefined) updateData.description = description;
        if (imageUrl) updateData.imageUrl = imageUrl;

        const image = await prisma.gallery.update({
            where: { id },
            data: updateData,
        });

        await prisma.notification.create({
            data: {
                message: `Gallery image "${image.title || 'Untitled'}" updated`,
                type: 'info',
                entityType: 'gallery',
                entityId: image.id,
            },
        });

        res.json(image);
    } catch (error) {
        res.status(404).json({ error: 'Gallery item not found' });
    }
};

export const deleteGallery = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const image = await prisma.gallery.findUnique({ where: { id } });

        if (image?.imageUrl && image.imageUrl.startsWith('/uploads/')) {
            const imgPath = path.join(__dirname, '..', '..', image.imageUrl);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }

        await prisma.gallery.delete({ where: { id } });

        await prisma.notification.create({
            data: {
                message: `Gallery image "${image?.title || 'Untitled'}" removed`,
                type: 'error',
                entityType: 'gallery',
                entityId: id,
            },
        });

        res.json({ message: 'Success' });
    } catch (error) {
        res.status(404).json({ error: 'Gallery item not found' });
    }
};
