import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PRODUCT_SERVICE_NAME, productServiceClient } from 'types/proto/products';

@Controller('product')
export class ProductController implements OnModuleInit {
    private productService: productServiceClient;

    constructor(@Inject(PRODUCT_SERVICE_NAME) private productGRPCClient: ClientGrpc) { }

    onModuleInit() {
        this.productService = this.productGRPCClient.getService<productServiceClient>(PRODUCT_SERVICE_NAME);
    }

    @Get(":id")
    getProduct(@Param("id") productId: number) {
        return this.productService.getProduct({ productId: productId })
    }
}
