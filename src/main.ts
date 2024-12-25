import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DefaultResponseInterceptor } from './config/customHttpResponse';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new DefaultResponseInterceptor());
  const port = 3005;
  await app.listen(port, () => {
    console.log("===========================================================================================================================>")
    console.log('Running at port: ', port)
    console.log("===========================================================================================================================>")
  });
}
bootstrap();
