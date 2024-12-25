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
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD,
      useClass: JwtAuthGuard,},
    AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthGuardMiddleware)
      .exclude(
        'auth/login',   
        'auth/signup',  
      )
      .forRoutes('*');
  }
}



