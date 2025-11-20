import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  PRODUCT_PACKAGE_NAME,
  PRODUCT_SERVICE_NAME,
} from 'types/proto/products';
import { ProductController } from './product.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PRODUCT_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/products.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}
