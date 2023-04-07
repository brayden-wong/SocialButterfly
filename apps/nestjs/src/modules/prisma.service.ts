import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@acme/db';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['info'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks() {
    this.$on('beforeExit', async () => {
      await this.$disconnect();
    });
  }
}
