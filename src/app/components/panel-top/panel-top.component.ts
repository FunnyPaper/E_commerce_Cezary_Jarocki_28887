import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MainService } from 'src/app/services/main.service';
import { Observable } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { IProduct } from 'src/app/interfaces/IProduct';
import { ICartProduct } from 'src/app/interfaces/ICartProduct';

@Component({
    selector: 'app-panel-top',
    templateUrl: './panel-top.component.html',
    styleUrls: ['./panel-top.component.scss'],
})
export class PanelTopComponent implements OnInit {
    private scroll!: HTMLElement;
    private $cart!: Observable<ICartProduct[]>;

    constructor(
        private mainService: MainService,
        private cartService: CartService
    ) {}

    ngOnInit(): void {
        this.scroll = document.getElementById('scroll_top')!;
        this.$cart = this.cartService.$Cart;
    }

    @HostListener('window:scroll')
    scrollChange(): void {
        window.scrollY > 500
            ? (this.scroll.style.display = 'block')
            : (this.scroll.style.display = 'none');
    }

    $getCartQuantity(): Observable<number> {
        return this.$cart.pipe(
            map((cart) => cart.length),
            defaultIfEmpty(0)
        );
    }

    scrollTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    sendQuery(query: string): void {
        this.mainService.fetchProducts(query);
    }

    get $Cart(): Observable<ICartProduct[]> {
        return this.$cart;
    }
}
