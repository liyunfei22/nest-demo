import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FooService } from './foo.service';
import { CreateFooDto } from './dto/create-foo.dto';
import { UpdateFooDto } from './dto/update-foo.dto';
import { CommonService } from 'src/common/common.service';

@Controller('foo')
export class FooController {
  constructor(
    private readonly fooService: FooService,
    private readonly commonService: CommonService,
  ) {}

  @Post()
  create(@Body() createFooDto: CreateFooDto) {
    return this.fooService.create(createFooDto);
  }

  @Get()
  findAll() {
    return this.commonService.common();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fooService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFooDto: UpdateFooDto) {
    return this.fooService.update(+id, updateFooDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fooService.remove(+id);
  }
}
