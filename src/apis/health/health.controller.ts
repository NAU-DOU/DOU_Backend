import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getAll(): string {
    return "I'm Health!";
  }
}
