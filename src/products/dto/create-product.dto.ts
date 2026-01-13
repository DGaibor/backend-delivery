import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  image: string;
}
