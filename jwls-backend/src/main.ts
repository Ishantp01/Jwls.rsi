import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);

  console.log(`Server is running on port ${PORT}`);
}
bootstrap();
