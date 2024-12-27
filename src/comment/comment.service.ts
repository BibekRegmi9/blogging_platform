import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class CommentService {

    constructor(
      @InjectRepository(Comment) private commentRepository: Repository<Comment>,
      @InjectRepository(Post) private postRepository: Repository<Post>
    ) { }

  async create(createCommentDto: CreateCommentDto) {
    if(createCommentDto.post_id != null){
      const post = await this.postRepository.findOne({where: {id: createCommentDto.post_id}});
      if(post){
        return (await this.commentRepository.save(createCommentDto)).id;
      } else {
        throw new NotFoundException('Post not found');
      }
    }
  }

  async findAllCommentsInAPost(postId: number) {
    if(postId){
      const query = `select * from comments where post_id = ${postId}`;
      return await this.commentRepository.query(query);
    } else {
      throw new NotFoundException('Post id not found');
    }
    
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne({where: {id}});
    if(comment){
      return (await this.commentRepository.save({...comment, ...updateCommentDto})).id;
    } else {
      throw new NotFoundException('Comment not found to update');
    }
  }

  async remove(id: number) {
    return this.commentRepository.delete(id);
  }
}

