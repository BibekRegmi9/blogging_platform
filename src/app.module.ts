import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthModule } from './user/auth.module';
import { AuthController } from './user/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.POSTGRES_HOST,
      // port: +process.env.PORT,
      // username: process.env.POSTGRES_USER,
      // password: process.env.POSTGRES_PASSWORD,
      // database: process.env.POSTGRES_DATABASE,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'blogging_db',
      entities: [User, Post, Comment],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: 'your-secret-key',  
      signOptions: { expiresIn: '3h' },  
    }),
    PostModule,
    CommentModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService],
})
export class AppModule {
}



