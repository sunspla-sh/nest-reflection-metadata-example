import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cats.interface';

@Injectable()
export class CatsService {
  private catsArray: Array<Cat> = [
    {
      name: 'tim',
      age: 3,
    },
    {
      name: 'jim',
      age: 4,
    },
  ];

  findAllCats(): Array<Cat> {
    return this.catsArray;
  }

  create(newCat: Cat) {
    this.catsArray = [...this.catsArray, newCat];
  }
}
