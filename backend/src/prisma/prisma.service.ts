import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    // Connect to the DB upon initialisation
    async onModuleInit() {
        await this.$connect;        
    }
}