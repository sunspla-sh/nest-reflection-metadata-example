import { IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class CatDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  age: number;
}
