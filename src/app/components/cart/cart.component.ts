import { MainService } from 'src/app/services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  uniqueCart: any[] = [];
  map = new Map();

  constructor(public mainService: MainService) {
    this.uniqueItem();
  }

  ngOnInit(): void {
  }
  getCartPrice(): number{
    let price = 0;
    for (const object of this.mainService.cart){
      price += parseFloat(object.product.price);
    }
    return price;
  }
  removeFromCart(product: any): void{
    const index = this.mainService.cart.findIndex((prod: any) => {
      return prod.product.id === product.product.id;
    });
    if (index > -1){
      this.mainService.cart.splice(index, 1);
      const checkIndex = this.mainService.cart.findIndex((prod: any) => {
        return prod.product.id === product.product.id;
      });
      if (checkIndex === -1){
        const uniqueIndex = this.uniqueCart.indexOf(product, 0);
        this.map.delete(product.product.id);
        this.uniqueCart.splice(uniqueIndex, 1);
      }
    }
  }
  uniqueItem(): void{
    for (const product of this.mainService.cart) {
      if (!this.map.has(product.product.id)){
          this.map.set(product.product.id, true);
          this.uniqueCart.push(product);
      }
    }
  }
  getProductCount(product: any): number {
    let quantity = 0;
    for (const p of this.mainService.cart) {
      if (p.product.id === product.id) {
        quantity += 1;
      }
    }
    return quantity;
  }
  changeToCorrect(): void {
    const inv = document.getElementById('invalid');
    const v = document.getElementById('correct');
    // tslint:disable-next-line: no-non-null-assertion
    if (inv === null) { v!.id = 'invalid'; }
    // tslint:disable-next-line: no-non-null-assertion
    else { inv!.id = 'correct'; }
  }
}
