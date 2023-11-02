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
import { ConfigService } from 'src/config/config.service';

@Controller('foo')
export class FooController {
  constructor(
    private readonly fooService: FooService,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createFooDto: CreateFooDto) {
    return this.fooService.create(createFooDto);
  }

  @Get()
  findAll() {
    this.commonService.common();
    return this.configService.get('name');
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
