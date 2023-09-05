import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  // DTO validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      always: true
    }),
  );

   // Swagger configuration part
   const config = new DocumentBuilder()
   .setTitle('Starter-kit')
   .setDescription('Startek-kit for backend app')
   .setVersion('1.0')
   .addBearerAuth(
     {
       type: 'http',
       scheme: 'bearer',
       bearerFormat: 'JWT',
       name: 'JWT',
       description: 'Enter JWT token',
       in: 'header',
     },
     'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
   )
   .build();

 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('docs', app, document, {
 });

  app.use(helmet());

 await app.listen(process.env.API_PORT);
}
bootstrap();

