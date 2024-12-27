import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthGuardMiddleware } from './middleware/authGuardMiddleware';
import { AuthModule } from './user/auth.module';
import { AuthController } from './user/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from './post/post.module';

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
      entities: [User],
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
  ],
  controllers: [AppController, AuthController],
  providers: [
    // { provide: APP_GUARD,
      // useClass: JwtAuthGuard,},
    AppService],
})
export class AppModule {
//  implements NestModule{
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthGuardMiddleware)
//       .exclude(
//         'auth',
//         'auth/login',       
//         'auth/signup',       
//       )
//       .forRoutes('*');
//   }
}



