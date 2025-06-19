import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBurgers = async (req: Request, res: Response): Promise<void> => {
    try {
        const burgers = await prisma.burger.findMany();
        res.status(200).json(burgers);
    } catch (error) {
        console.error('Error fetching burgers from database:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des burgers' });
    }
}