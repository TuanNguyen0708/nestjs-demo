import { MinLength, IsNotEmpty } from "class-validator";

export class UserDTO {
    @IsNotEmpty()
    firstName?: string;

    @IsNotEmpty()
    lastName?: string;

    @IsNotEmpty()
    email?: string;

    isActive?: boolean;
}