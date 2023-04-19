import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ICartProduct } from '../interfaces/ICartProduct';

@Injectable({
    providedIn: 'root',
})
export class CartService implements OnDestroy {
    private url = 'http://localhost:3000/cart';
    private headerOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    private $cartBehavior!: BehaviorSubject<ICartProduct[]>;
    private subscriptions!: Subscription;

    constructor(private httpClient: HttpClient) {
        this.$cartBehavior = new BehaviorSubject<ICartProduct[]>([]);
        this.subscriptions = new Subscription();
        this.init();
    }

    private init(): void {
        this.fetchCart();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    fetchCart(): void {
        this.subscriptions.add(
            this.httpClient
                .get<ICartProduct[]>(`${this.url}`, this.headerOptions)
                .subscribe((cart) => this.$cartBehavior.next(cart))
        );
    }

    addToCart(product: ICartProduct): void {
        this.subscriptions.add(
            this.httpClient
                .post<ICartProduct>(`${this.url}`, product, this.headerOptions)
                .subscribe(() => this.fetchCart())
        );
    }

    removeFromCart(id: number): void {
        this.subscriptions.add(
            this.httpClient
                .delete<ICartProduct>(`${this.url}/${id}`, this.headerOptions)
                .subscribe(() => this.fetchCart())
        );
    }

    deleteCart(): void {
        // json-server workaround
        this.$Cart.subscribe(cart => cart.forEach(c => this.removeFromCart(c.id!)));
    }

    get $Cart(): Observable<ICartProduct[]> {
        return this.$cartBehavior.asObservable();
    }
}
