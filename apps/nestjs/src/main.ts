import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { WebSocketAdapter } from "./utils";

const bootstrap = async () => {
  const logger = new Logger("BOOTSTRAP");

  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);

  const port = config.get<number>("PORT") || 8080;

  app.useWebSocketAdapter(new WebSocketAdapter(app, config));
  await app.listen(port, () => logger.verbose(`Listening on port ${port}`));
};
bootstrap();
