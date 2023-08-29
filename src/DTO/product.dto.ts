import { MinLength, IsNotEmpty, isNumber, IsNumber } from "class-validator";

export class ProductDTO {
    @IsNotEmpty()
    category?: number;

    @MinLength(5, {message: "This field must be than 5 charactor!"})
    productName?: string;

    @IsNumber()
    price?: number;
}