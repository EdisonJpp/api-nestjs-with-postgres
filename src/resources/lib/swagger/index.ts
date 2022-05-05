import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function swagger(app: INestApplication) {
  const opt = new DocumentBuilder()
    .setTitle('Nestjs')
    .setDescription('api ->  nestjs + mongoDB')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const docs = SwaggerModule.createDocument(app, opt);
  SwaggerModule.setup('api/docs', app, docs, {
    explorer: true,
    swaggerOptions: {
      filter: true,
    },
    customSiteTitle: 'API Nestjs',
  });
}
