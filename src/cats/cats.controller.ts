import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    @Inject('CONNECTION') private connection: string,
  ) {}

  @Get()
  findAll() {
    console.log(this.connection);
    return this.catsService.findAll();
  }

  @Post()
  create(@Body() createCatDto: any) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
    return 'success';
  }
}
