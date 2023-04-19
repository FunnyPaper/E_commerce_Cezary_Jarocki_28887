import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, defaultIfEmpty } from 'rxjs/operators';
import { ICartProduct } from 'src/app/interfaces/ICartProduct';
import { IProduct } from 'src/app/interfaces/IProduct';
import { IProductData } from 'src/app/interfaces/IProductData';
import { CartService } from 'src/app/services/cart.service';
import { MainService } from 'src/app/services/main.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    private $products!: Observable<IProduct[]>;
    private $cart!: Observable<ICartProduct[]>;

    constructor(
        private mainService: MainService,
        private cartService: CartService
    ) {}

    ngOnInit(): void {
        this.$products = this.mainService.$Products;
        this.$cart = this.cartService.$Cart;
    }

    get $Products() {
        return this.$products;
    }

    get $Cart() {
        return this.$cart;
    }

    addToCart(product: IProduct): void {
        this.cartService.addToCart({ product });
    }

    $getProductCount(product: IProduct): Observable<number> {
        return this.$Cart.pipe(
            map((cart) =>
                cart.reduce(
                    (count, p) => (product.id === p.product.id ? count + 1 : count),
                    0
                )
            ),
            defaultIfEmpty(0)
        );
    }
}
