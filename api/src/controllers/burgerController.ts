import { Request, Response } from 'express';
import { Burger } from '../types/burger';

import fs from 'fs';
import path from 'path';

const burgersFilePath = path.join(__dirname, '../data/burgers.json');

export const getBurgersFromFile = async (): Promise<Burger[]> => {
    try {
        const data = fs.readFileSync(burgersFilePath, 'utf8');
        return JSON.parse(data) as Burger[];
    } catch (error) {
        console.error('Error reading burgers file:', error);
        return [];
    }
}

export const getAllBurgers = async (req: Request, res: Response): Promise<void> => {
    const burgers = await getBurgersFromFile();
    res.status(200).json(burgers);
}