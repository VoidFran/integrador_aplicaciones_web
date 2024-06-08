import { IsNotEmpty, IsString, IsEnum, IsEmail } from "class-validator"

// Los datos que le va pasar el front-end
export class EmailDto {

    @IsNotEmpty()
    @IsEmail()
    to: string

    @IsNotEmpty()
    @IsString()
    subject: string

    @IsNotEmpty()
    @IsString()
    message: string
}
