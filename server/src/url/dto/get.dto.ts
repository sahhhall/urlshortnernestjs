import { IsString, Length } from 'class-validator';

export class GetUrlDTO {
  @IsString()
  @Length(6, 6) 
  shortId: string;
}
