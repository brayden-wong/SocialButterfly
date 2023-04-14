import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MessageModule } from "./modules";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
