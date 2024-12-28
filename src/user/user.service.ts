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
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto, password: hashedPassword
    });

    const saveUser = await this.userRepository.save(newUser);
    return saveUser.id;
  }

  async findAll():Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({where: {id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({where: {id}});

    if(updateUserDto.email || updateUserDto.password){
      throw new HttpException(
        'Only profile information can be updated; email and password cannot be updated.',
        HttpStatus.BAD_REQUEST, 
      );    }

    if(!user){
      throw new HttpException(`User with ID ${id} not found`, HttpStatus.BAD_REQUEST,);
    }
    const updatedUser = await this.userRepository.save({...user, ...updateUserDto});
    return updatedUser.id;

  }

  remove(id: number) {
    this.userRepository.delete({id});
  }

  async findByUserName(email: string){
    return this.userRepository.findOne({where: {email}});
  }

  async saveUser(email: string, password: string){
    return this.userRepository.save({email, password});
  }
}
