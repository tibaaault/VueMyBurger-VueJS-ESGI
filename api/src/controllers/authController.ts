import { Request, Response } from 'express';
import { User } from '../types/user';
import bcrypt from 'bcrypt';
import prisma from '../prisma/client';
import { generateToken } from '../utils/jwt';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body as User;

    if (!username || !email || !password) {
        res.status(400).json({ message: 'Des champs semblent manquants !' });
        return;
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            res.status(400).json({ message: 'Cet email est déjà utilisé !' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        const token = generateToken(username);

        res.status(201).json({ message: 'Votre compte a été créé avec succès !', user: { id: newUser.id, email: newUser.email, username: newUser.username }, token });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la création du compte.' });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as User;

    if (!email || !password) {
        res.status(400).json({ message: 'Des champs semblent manquants !' });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            res.status(401).json({ message: 'Les informations d\'identification sont invalides' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: 'Les informations d\'identification sont invalides' });
            return;
        }

        const token = generateToken(user.username);

        res.status(200).json({ message: 'Connexion réussie !', user: { id: user.id, email: user.email, username: user.username }, token });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
    }
};