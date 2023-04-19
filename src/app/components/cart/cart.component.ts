import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { ICartProduct } from 'src/app/interfaces/ICartProduct';
import { IProduct } from 'src/app/interfaces/IProduct';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
    private $cart!: Observable<ICartProduct[]>;
    private subscriptions!: Subscription;

    form: FormGroup = this.builder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required],
    });

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        private builder: FormBuilder
    ) {
        this.subscriptions = new Subscription();
    }

    ngOnInit(): void {
        this.$cart = this.cartService.$Cart;
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    $getCartPrice(): Observable<number> {
        return this.$cart.pipe(
            map((cart) =>
                cart.reduce((price, cart) => price + cart.product.price, 0)
            ),
            defaultIfEmpty(0)
        );
    }

    removeFromCart(product: ICartProduct): void {
        this.cartService.removeFromCart(product.id!);
    }

    $getProductCount(product: IProduct): Observable<number> {
        return this.$cart.pipe(
            map((cart) =>
                cart.reduce(
                    (count, cart) =>
                        product.id === cart.product.id ? count + 1 : count,
                    0
                )
            ),
            defaultIfEmpty(0)
        );
    }

    submit() {
        this.subscriptions.add(
            this.$cart
                .pipe(map((x) => x.map((x) => x.product)))
                .subscribe((products) => {
                        this.orderService.addOrder({
                            ...this.form.value,
                            date: new Date().toISOString(),
                            products,
                        });
                        this.cartService.deleteCart();
                    }
                )
        );
    }

    get $Cart(): Observable<ICartProduct[]> {
        return this.$cart;
    }

    get $UniqueCart(): Observable<ICartProduct[]> {
        return this.$cart.pipe(
            map((cart) =>
                cart
                    .reduce(
                        (prev, curr) => ((prev[curr.product.id] = curr), prev),
                        [] as ICartProduct[]
                    )
                    .filter((x) => x)
            )
        );
    }
}
