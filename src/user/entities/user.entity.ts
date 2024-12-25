import { Exclude } from "class-transformer";
import { CommonEntity } from "src/common/common.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt';


@Entity({name: 'users'})
export class User extends CommonEntity {
    @Column({nullable: false})
    fullname: string;

    @Column({unique: true})
    email: string;    

    @Exclude({ toPlainOnly: true })
    @Column({ select: false })
    @Exclude()
    password: string;

//     @BeforeInsert()
//     async hashPassword() {
//     this.password = await bcrypt.hash(this.password, 10);
//   }

    @Column({default:null})
    profile_pic: string;

    @Column({default:false})
    is_password_changed: boolean;

    @Column({default:null})
    gender: string;

    @Column({ type: 'timestamp with time zone', nullable: true })
    birth_date: Date;
}



export interface JwtPayload {
    id: number; 
    username: string; 
  }
