import { Injectable } from '@nestjs/common/decorators';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/models/user.model';
import { UserDTO } from 'src/DTO/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUser(userDTO: UserDTO): Promise<User> {
    return await this.userRepository.save(userDTO);
  }

  async detailUser(id: number): Promise<UserEntity> {
    const options: FindOneOptions<User> = {
      where: { id },
    };
    return await this.userRepository.findOne(options);
  }

  async updateUser(userDTO: UserDTO, id: number): Promise<User> {
    const existingUser = await this.detailUser(id);
    if (!existingUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    Object.assign(existingUser, userDTO);

    return await this.userRepository.save(existingUser);
  }

  async deleteUser(id: number): Promise<UserEntity> {
    const existingUser = await this.detailUser(id);
    if (!existingUser) {
      throw new Error(`User with ID ${id} not found`);
    }
    return await this.userRepository.remove(existingUser);
  }
}
