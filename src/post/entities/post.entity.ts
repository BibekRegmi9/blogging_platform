import { CommonEntity } from "src/common/common.entity";
import { Column, Entity } from "typeorm";

@Entity({name: 'users'})
export class Post extends CommonEntity{
    @Column({nullable: false})
    title: string; 

    @Column({nullable: false})
    content: string;

    @Column({nullable: false})
    author: string;
}
