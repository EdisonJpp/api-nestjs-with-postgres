import { Controller, Get, Header } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './resources/helpers/decorators';

@ApiTags('Initial')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  @Header('Content-Type', 'text/html')
  getHello(): { name: string } {
    return { name: 'Hello World!' };
  }
}
