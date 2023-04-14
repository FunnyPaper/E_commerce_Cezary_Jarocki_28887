import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(public mainService: MainService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  getProducts(){
    this.mainService.getProducts(this.mainService.productsRequest);
  }
  // tslint:disable-next-line: typedef
  addToCart(product: any) {
    this.mainService.cart.push({product});
    console.log('Dodano produkt do koszyka: ');
    console.log(product);
  }
  getProductCount(product: any): number {
    let quantity = 0;
    for (const p of this.mainService?.cart) {
      if (p.product.id === product.id) {
        quantity += 1;
      }
    }
    return quantity;
  }
}
