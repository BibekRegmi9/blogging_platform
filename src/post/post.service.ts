import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository, Transaction } from 'typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImageDetails } from './entities/ImageDetails.entity';
import { ImageUploadDto, UploadFileObject } from './dto/image.dto';
import { deleteDocument } from 'src/utils/multer';


@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(ImageDetails) private imageUploadRepository: Repository<ImageDetails>
  ) { }

  async createOrUpdatePost(createPostDto: CreatePostDto) {
    let post = null;

    if (createPostDto.id) {
      post = await this.postRepository.findOne({ where: { id: createPostDto.id } });
    }

    if (post!= null) {
      //update existing post
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

  async findAll() {
    return this.postRepository.find();
  }

  async findOne(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return this.postRepository.delete({ id });
  }

  async uploadImage(post_id: number, file: Express.Multer.File | UploadFileObject) {

    const post = await this.postRepository.findOne({ where: { id: post_id } });
    if(!post) {
      throw new Error('Post not found');
    }
    
    //save image details in the database
    const imageDetails = this.imageUploadRepository.create({
      post,
      post_id: post_id,
      mimeType: file.mimetype,
      fileName: file.originalname,
      location: file.path,
    });

    await this.imageUploadRepository.save(imageDetails);
  }

  async deleteBlogPostImage(post_id: number){
    const post = this.postRepository.findOne({ where: { id: post_id } });
    if(!post) {
      throw new Error('Post not found');
    }

    const imageDetails = this.imageUploadRepository.findOne({ where: { post_id } });
    if(!imageDetails) {
      throw new Error('Image not found');
    }

    //delete image from the database and from the file system
    deleteDocument((await imageDetails).location);
    await this.imageUploadRepository.delete({post_id});
    
  }

}
