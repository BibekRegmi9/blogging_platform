import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Post } from "./post.entity";

@Entity({ name: 'image_details' })
export class ImageDetails extends CommonEntity {

    @Column()
    post_id: number;
    @ManyToOne(() => Post)
    @JoinColumn({
        name: 'post_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'post_id',
    })
    post: Post;

    @Column({ name: "mime_type", nullable: true })
    mimeType: string;
  
    @Column({ name: "file_name", nullable: true })
    fileName: string;
  
    @Column({ name: "location" })
    location: string;
}

