import { Request } from 'express';

export interface KakaoRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    type: string;
  };
}
