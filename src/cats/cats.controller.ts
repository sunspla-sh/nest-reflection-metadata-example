import {
  Controller,
  Get,
  Post,
  SetMetadata,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Cat } from './interfaces/cats.interface';
import { CatsService } from './cats.service';
import { CatDto } from './dtos/cats.dto';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from 'src/roles.guard';

@Roles('user')
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAllCats(): Array<Cat> {
    return this.catsService.findAllCats();
  }

  @Post('create')
  @SetMetadata('roles', ['admin']) //here we set metadata manually with the SetMetadata decorator
  @UseGuards(RolesGuard)
  async create(@Body() catDto: CatDto) {
    this.catsService.create(catDto);
  }

  @Post('create/multiple') //validation does not trigger properly becuase CatDto is not actually instantiated - only used for type reference
  async createAll(@Body() catDtoArray: Array<CatDto>) {
    this.catsService.createAll(catDtoArray);
  }

  // @Delete()
  // @Roles('admin')
  // async deleteCat() {

  // }
}
