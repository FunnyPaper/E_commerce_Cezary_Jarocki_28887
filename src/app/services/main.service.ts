import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { IProductData } from '../interfaces/IProductData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MainService implements OnDestroy {
    private url = 'http://localhost:3000/products';
    private headerOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    private $productsBehavior!: BehaviorSubject<IProduct[]>;
    private subscriptions!: Subscription;

    constructor(private httpClient: HttpClient) {
        this.$productsBehavior = new BehaviorSubject<IProduct[]>([]);
        this.subscriptions = new Subscription();
        this.init();
    }

    private init(): void {
        this.fetchProducts();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    fetchProducts(query?: string): void {
        this.subscriptions.add(
            this.httpClient
                .get<IProduct[]>(
                    `${this.url}${query ? `?title_like=${query}` : ''}`,
                    this.headerOptions
                )
                .subscribe((products) => this.$productsBehavior.next(products))
        );
    }

    addProduct(newProduct: IProductData): void {
        this.subscriptions.add(
            this.httpClient
                .post<IProductData>(
                    `${this.url}`,
                    newProduct,
                    this.headerOptions
                )
                .subscribe(() => this.fetchProducts())
        );
    }

    removeProduct(id: number): void {
        this.subscriptions.add(
            this.httpClient
                .delete<IProduct>(`${this.url}/${id}`, this.headerOptions)
                .subscribe(() => this.fetchProducts())
        );
    }

    get $Products(): Observable<IProduct[]> {
        return this.$productsBehavior.asObservable();
    }
}
