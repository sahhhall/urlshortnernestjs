import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlDTO {
  @IsNotEmpty()
  @IsUrl()
  url: string;

}
