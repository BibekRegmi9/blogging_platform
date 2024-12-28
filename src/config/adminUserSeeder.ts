import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminUserSeeder implements OnApplicationBootstrap {
    constructor(private readonly userService: UserService) { }

    async onApplicationBootstrap() {
        const defaultUser = {
            email: 'admin@gmail.com',
            password: 'admin123',
        };
        
        const existingUser = await this.userService.findByUserName(defaultUser.email);
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(defaultUser.password, 10);
            await this.userService.saveUser(defaultUser.email, hashedPassword);
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Default admin user created:', " email:"+ defaultUser.email + " password:" + defaultUser.password);
        } else {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Default admin user already exists:', " email:"+ defaultUser.email + " password:" + defaultUser.password);
        }


    }
}
