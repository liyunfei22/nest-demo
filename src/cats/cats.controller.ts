import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  HttpCode,
  Header,
  Headers,
  Redirect,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dot';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    console.log(createCatDto);
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id/:name')
  findOne1(@Param() params: any): string {
    console.log(params);
    return `This action returns a #${params.name} cat`;
  }

  @Get('req')
  findOne2(@Req() req: any): string {
    console.log(req);
    return `get req`;
  }

  @Get('res')
  findOne3(@Res() response: any): string {
    // @Res({ passthrough: true })
    console.log(response);
    response.status(404).send('res');
    return `get res`;
  }

  @Put(':id')
  update(@Param() id: string, @Body() updateCatDto: UpdateCatDto): string {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param() id: string): string {
    return `This action removes a #${id} cat`;
  }

  @Get('ab*cd')
  find(): string {
    return 'This route uses a wildcard';
  }

  @Post('status')
  @HttpCode(204)
  create1() {
    return 'This action adds a new cat';
  }

  @Post('setHeader')
  @Header('Cache-Control', 'none')
  m1() {
    return 'This action adds a new cat';
  }

  @Get('redirect')
  @Redirect('https://www.baidu.com', 301)
  redirect(@Query('version') version: string) {
    if (version && version === '5') {
      return { url: 'https://www.xiaomi.com' };
    }
    return 'This action returns all cats';
  }

  @Get('Headers')
  find1(@Headers() header: any): string {
    console.log(header);
    return 'This route uses a wildcard';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }
}
