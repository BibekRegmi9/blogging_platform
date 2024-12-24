import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const newUser = this.userRepository.create({
      ...createUserDto, password: hashedPassword
    });

    const saveUser = await this.userRepository.save(newUser);
    return saveUser.id;
  }

  async findAll() {
    const query = `select *
    from users;`;

    const users = await this.userRepository.query(query);
    return users;
  }

  async findOne(id: number) {
    return this.userRepository.findOne({where: {id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.findOne({where: {id}});

    if(!user){
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user && (await user).id != id) {
      throw new HttpException(
        `The user with email ${(await user).email} already exist`,
        HttpStatus.CONFLICT,
      );
    }

    return (await user).id;
  }

  remove(id: number) {
    this.userRepository.delete({id});
  }
}
