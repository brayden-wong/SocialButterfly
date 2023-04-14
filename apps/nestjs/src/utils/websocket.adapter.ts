import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "socket.io";

export class WebSocketAdapter extends IoAdapter {
  constructor(private app: INestApplication, private config: ConfigService) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    port = this.config.get<number>("SOCKET_PORT") || 8500;
    const origins = this.config.get<string>("SOCKET_ORIGINS");

    // const origin = origins.split(',');

    // options.cors = { origin };

    const server = super.createIOServer(port, options);

    return server;
  }
}
