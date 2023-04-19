import { Injectable, OnDestroy } from '@angular/core';
import { IOrder } from '../interfaces/IOrder';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OrderService implements OnDestroy {
    private url = 'http://localhost:3000/orders';
    private headerOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    private $ordersBehavior!: BehaviorSubject<IOrder[]>;
    private subscriptions!: Subscription;

    constructor(private httpClient: HttpClient) {
        this.$ordersBehavior = new BehaviorSubject<IOrder[]>([]);
        this.subscriptions = new Subscription();
        this.init();
    }

    private init(): void {
        this.fetchOrder();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    fetchOrder(): void {
        this.subscriptions.add(
            this.httpClient
                .get<IOrder[]>(`${this.url}`, this.headerOptions)
                .subscribe((orders) => this.$ordersBehavior.next(orders))
        );
    }

    addOrder(order: IOrder) {
        this.subscriptions.add(
            this.httpClient
                .post<IOrder>(`${this.url}`, order, this.headerOptions)
                .subscribe(() => this.fetchOrder())
        );
    }

    get $Orders(): Observable<IOrder[]> {
        return this.$ordersBehavior.asObservable();
    }
}
