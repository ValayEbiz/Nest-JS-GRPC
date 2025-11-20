import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductRequest, ProductResponse, productServiceController, productServiceControllerMethods } from 'types/proto/products';

@Controller('product')
@productServiceControllerMethods()
export class ProductController implements productServiceController {

    getProduct(request: ProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse {
        return {
            productId: request.productId,
            name: 'Laptop',
            price: 1000
        }
    }
}
