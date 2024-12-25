import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload, User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';


export class AuthService{
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private userService: UserService
    ){}

    async signUp(payload: CreateUserDto): Promise<{ message: string }> {
        const email = payload.email;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new BadRequestException('User already exists with this email');
        }
    
        this.userService.create(payload);
        return { message: 'User registered successfully' };

    }

    async login(email: string, password:string): Promise<{ token: string }> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            throw new BadRequestException('User not found with this email');
        }
    
        const isPasswordValid = await this.validatePassword(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }
    
        const payload = { email: user.email, sub: user.id };
        return { token: this.jwtService.sign(payload)};
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    /**
   * @param payload 
   */
  async validateUser(payload: JwtPayload): Promise<User | null> {
    const user = await this.userService.findOne(payload.id); 
    if (!user) {
      return null; 
    }
    return user; 
  }
}