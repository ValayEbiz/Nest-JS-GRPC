/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'product';

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('Unable to locate global object');
})();

export interface ProductRequest {
  productId: number;
}

export interface ProductResponse {
  productId: number;
  name: string;
  price: number;
}

export const PRODUCT_PACKAGE_NAME = 'product';

export interface productServiceClient {
  getProduct(request: ProductRequest): Observable<ProductResponse>;
}

export interface productServiceController {
  getProduct(
    request: ProductRequest
  ): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse;
}

export function productServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods = ['getProduct'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('productService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod('productService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const PRODUCT_SERVICE_NAME = 'productService';
