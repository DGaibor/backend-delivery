import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from "../services/prisma.service";
import { AuthGuard } from "../guards/auth.guard";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, AuthGuard],
})
export class ProductsModule {}
