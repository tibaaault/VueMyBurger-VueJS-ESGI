import { Request, Response } from 'express';
import { User } from '../types/user';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

const usersFilePath = path.join(__dirname, '../data/users.json');

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { userName, email, password } = req.body as User;

    if (!userName || !email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    let users: User[] = [];

    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        users.push(...JSON.parse(data));
    } catch (error) {
        console.error('Error reading users file:', error);
    }

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
        id: users.length + 1,
        userName,
        email,
        password: hashedPassword
    };

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    res.status(201).json({ message: 'User registered successfully', user: newUser });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as User;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    let users: User[] = [];

    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        users.push(...JSON.parse(data));
    } catch (error) {
        console.error('Error reading users file:', error);
    }

    const user = users.find(user => user.email === email);

    if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    res.status(200).json({ message: 'Login successful', user });
};