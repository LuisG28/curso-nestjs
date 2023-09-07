import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUrl } from "class-validator";

export class CreateCourseDto {

    @ApiProperty({
        description: 'The age of a cat',
        minimum: 1,
        default: 1,
    })
    @IsNotEmpty()
    tittle : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price : number;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    cover : string;
}
