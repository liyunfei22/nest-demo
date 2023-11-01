import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Post()
  create(@Body() createCatDto: any) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
    return 'success';
  }
}
