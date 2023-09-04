import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from 'src/models/user.model';
import { UserDTO } from 'src/DTO/user.dto';
import { UserEntity } from 'src/entities/user.entity';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usertService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    try {
      return this.usertService.getUsers();
    } catch (error) {
      return new Promise<User[]>(null);
    }
  }

  @Post()
  createUser(@Body(new ValidationPipe()) userDTO: UserDTO): Promise<UserDTO> {
    try {
      return this.usertService.createUser(userDTO);
    } catch (error) {
      return new Promise<User>(null);
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async detailUser(@Param('id') id: number): Promise<User> {
    try {
      return await this.usertService.detailUser(Number(id));
    } catch (error) {
      return new Promise<User>(null);
    }
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Body() userDTO: UserDTO,
    @Param('id') id: number,
  ): Promise<User> {
    try {
      return await this.usertService.updateUser(userDTO, Number(id));
    } catch (error) {
      return new Promise<User>(null);
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: number): Promise<UserEntity> {
    try {
      return await this.usertService.deleteUser(Number(id));
    } catch (error) {
      return new Promise<UserEntity>(null);
    }
  }
}
