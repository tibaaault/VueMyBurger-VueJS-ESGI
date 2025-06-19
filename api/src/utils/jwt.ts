import jwt from 'jsonwebtoken';

export const generateToken = (username: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign(username, process.env.JWT_SECRET);
};
