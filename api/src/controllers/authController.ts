import { Request, Response } from 'express';
import { User } from '../types/user';
import bcrypt from 'bcrypt';
import fs from 'fs';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, password } = req.body as User;

    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    let users: User[] = []; // This should be replaced with actual data retrieval logic

    try {
        const data = fs.readFileSync('data/users.json', 'utf8');
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
        id: users.length + 1, // Simple ID generation, should be replaced with a better approach
        firstName,
        lastName,
        email,
        password: hashedPassword
    };

    users.push(newUser);
    fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2));
    res.status(201).json({ message: 'User registered successfully', user: newUser });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as User;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    let users: User[] = []; // This should be replaced with actual data retrieval logic

    try {
        const data = fs.readFileSync('data/users.json', 'utf8');
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