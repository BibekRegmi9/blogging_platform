import { Exclude } from "class-transformer";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity } from "typeorm";


@Entity({name: 'users'})
export class User extends CommonEntity {
    @Column({nullable: true})
    fullname: string;

    @Column({unique: true})
    email: string;    

    @Exclude({ toPlainOnly: true })
    @Column({ select: false })
    @Exclude()
    password: string;

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
