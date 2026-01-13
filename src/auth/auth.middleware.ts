import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const publicRoutes = [
      { path: '/auth/login', method: 'POST' },
      { path: '/users', method: 'POST' },
    ];

    const isPublic = publicRoutes.some(
      route =>
        route.path === req.path && route.method === req.method,
    );

    if (isPublic) {
      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req['user'] = decoded;
      next();
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}