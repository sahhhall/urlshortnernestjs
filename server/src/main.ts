import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,//it does not carry any extra proprty to controller 
    forbidNonWhitelisted:true //it throw a new error
  }))
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
