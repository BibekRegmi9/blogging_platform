import { Module} from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ImageDetails } from './entities/ImageDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, ImageDetails])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
