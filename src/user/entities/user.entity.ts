import { CommonEntity } from "src/common/common.entity";
import { Column, Entity } from "typeorm";

@Entity({name: 'users'})
export class User extends CommonEntity {
    @Column({nullable: false})
    fullname: string;

    @Column({unique: true})
    email: string;    

    @Column({nullable: false})
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
