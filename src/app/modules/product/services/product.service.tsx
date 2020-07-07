import { of } from "rxjs";
import { delay } from 'rxjs/operators';
import products from '../mock-data/products.json';

const getAllProducts = () => {
    return of(products).pipe(delay(1500));
}

export const productService = { getAllProducts }