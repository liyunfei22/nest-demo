import { Controller, Get } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';

@Controller('foo')
export class FooController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }
}
