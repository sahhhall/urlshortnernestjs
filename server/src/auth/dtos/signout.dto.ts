import { IsString } from "class-validator";

export class SignoutDTO {
    @IsString()
    userId: string;
}
