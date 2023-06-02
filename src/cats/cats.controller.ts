import { Controller, Get, Post, SetMetadata, Body } from '@nestjs/common';
import { Cat } from './interfaces/cats.interface';
import { CatsService } from './cats.service';
import { CatDto } from './dtos/cats.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAllCats(): Array<Cat> {
    return this.catsService.findAllCats();
  }

  @Post()
  @SetMetadata('roles', ['admin'])
  async create(@Body() catDto: CatDto) {
    return this.catsService.create(catDto);
  }
}
