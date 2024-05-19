import { Inject, Injectable, Logger, LoggerService, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

/*
// logger middleware
// CHECKLIST
// [ ] - JWT 관련 세팅 수정 필요
*/

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    // private readonly jwt: JwtService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, headers } = req;
    const userAgent = req.get('user-agent');
    // TODO: 추후 JWT 관련 설정 시 수정해야 함
    // const payload = headers.authorization ? '아직 설정 안함' : null;
    // const userId = payload ? payload.sub : 0;
    const datetime = new Date();
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(`${datetime} USER-{userId} ${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`);
    });

    next();
  }
}
