import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) { }

  async createOrUpdatePost(createPostDto: CreatePostDto) {
    let post = null;

    if (createPostDto.id) {
      post = await this.postRepository.findOne({ where: { id: createPostDto.id } });
    }

    if (post!= null) {
      // Update existing post
      // Object.assign(post, createPostDto);
      post.title = createPostDto.title;
      post.content = createPostDto.content;
      post.author = createPostDto.author;

    } else {
      // Create a new post
      post = this.postRepository.create(createPostDto);
    }

    const savedPost = await this.postRepository.save(post);
    return savedPost.id;
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.postRepository.delete({ id });
  }
}
