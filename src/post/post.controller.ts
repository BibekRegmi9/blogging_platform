import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import * as multer from 'multer';
import { multerDiskStorageConfig, imageFileFilter } from '../utils/multer';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.createOrUpdatePost(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }


  @Post('post-id/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerDiskStorageConfig({ path: 'images', type: 'image' }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new Error('image not uploaded');
    }

    return await this.postService.uploadImage(+id, image);
  }

  @Delete('post-id/:id')
  async deleteImage(@Param('id') id: string) {
    return await this.postService.deleteBlogPostImage(+id);
  }

}
