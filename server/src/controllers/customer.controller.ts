import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        const where = search
            ? {
                OR: [
                    { name: { contains: search as string, mode: 'insensitive' as const } },
                    { email: { contains: search as string, mode: 'insensitive' as const } },
                    { phone: { contains: search as string } },
                ],
            }
            : {};

        const customers = await prisma.customer.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
        res.json(customers);
    } catch (error) {
        console.error('Customer Fetch Error:', error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customer = await prisma.customer.findUnique({ where: { id } });
        if (!customer) {
            res.status(404).json({ error: 'Customer not found' });
            return;
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
};

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, address, notes } = req.body;
        const customer = await prisma.customer.create({
            data: { name, email, phone, address, notes },
        });

        await prisma.notification.create({
            data: {
                message: `New customer "${customer.name}" registered`,
                type: 'success',
                entityType: 'customer',
                entityId: customer.id,
            },
        });

        res.status(201).json(customer);
    } catch (error: any) {
        if (error.code === 'P2002') {
            res.status(400).json({ error: 'A customer with this email already exists' });
            return;
        }
        console.error('Customer Create Error:', error);
        res.status(400).json({ error: 'Failed to create customer' });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address, notes } = req.body;

        const customer = await prisma.customer.update({
            where: { id },
            data: { name, email, phone, address, notes },
        });

        await prisma.notification.create({
            data: {
                message: `Customer "${customer.name}" details updated`,
                type: 'info',
                entityType: 'customer',
                entityId: customer.id,
            },
        });

        res.json(customer);
    } catch (error: any) {
        if (error.code === 'P2002') {
            res.status(400).json({ error: 'A customer with this email already exists' });
            return;
        }
        res.status(404).json({ error: 'Customer not found' });
    }
};

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customer = await prisma.customer.findUnique({ where: { id } });
        await prisma.customer.delete({ where: { id } });

        await prisma.notification.create({
            data: {
                message: `Customer "${customer?.name}" has been removed`,
                type: 'error',
                entityType: 'customer',
                entityId: id,
            },
        });

        res.json({ message: 'Success' });
    } catch (error) {
        res.status(404).json({ error: 'Customer not found' });
    }
};
