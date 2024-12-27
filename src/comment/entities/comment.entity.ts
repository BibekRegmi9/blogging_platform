import { CommonEntity } from "src/common/common.entity";
import { Post } from "src/post/entities/post.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: 'comments'})
export class Comment extends CommonEntity{
    @Column({nullable: false})
    comment: string;
    
    @Column()
    post_id: number;
    @ManyToOne(() => Post)
    @JoinColumn({
        name: 'post_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'post_id',
    })
    post: Post;
}
