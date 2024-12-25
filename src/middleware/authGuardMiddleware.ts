import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuardMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
  
    if (req.path.startsWith('/auth')) {
      return next();  
    }

    const token = req.headers.authorization?.split(' ')[1];  

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = this.jwtService.verify(token);  
      req.user = decoded;  
      next();  
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
