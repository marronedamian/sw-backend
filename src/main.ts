import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Star Wars API")
    .setDescription("API para explorar el universo de Star Wars")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.enableCors({
    origin: ["http://localhost:3001", "https://thestarwars.site", "https://www.thestarwars.site"],
    credentials: true,
  });

  await app.listen(3021);
}
bootstrap();
