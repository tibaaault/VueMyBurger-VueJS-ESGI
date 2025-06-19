import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    throw new Error('Token manquant dans l\'en-tête Authorization')
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' })
    }

    req.user = user
    next()
  })
}