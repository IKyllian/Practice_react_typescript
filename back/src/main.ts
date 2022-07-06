import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // var whitelist = ['http://localhost:3001','http://localhost:3000'];
  // app.enableCors({
  // origin: function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     console.log("allowed cors for:", origin)
  //     callback(null, true)
  //   } else {
  //     console.log("blocked cors for:", origin)
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // },
  // allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  // methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
  // credentials: true,
  // });

  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}

bootstrap();