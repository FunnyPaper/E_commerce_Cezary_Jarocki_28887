import { MainService } from 'src/app/services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adm-products',
  templateUrl: './adm-products.component.html',
  styleUrls: ['./adm-products.component.scss']
})
export class AdmProductsComponent implements OnInit {

  constructor(public mainService: MainService) { }

  newProduct = {
    thumbnail: '',
    title: '',
    price: 0,
    category: ''
  };

  ngOnInit(): void {
    this.showUpdateOptions();
  }
  getProducts(): void {
    this.mainService.getProducts(this.mainService.productsRequest);
  }
  showUpdateOptions(): void {
    const d = document.getElementById('side_buttons');
    if (d?.style.display === 'none') {
      // tslint:disable-next-line: no-non-null-assertion
      d!.style.display = 'flex';
    } else {
      // tslint:disable-next-line: no-non-null-assertion
      d!.style.display = 'none';
    }
  }
  hide(): void {
    this.mainService.getProducts(this.mainService.productsRequest);
    const hidden = document.getElementById('hide');
    const d = document.getElementById('products-table');
    if (d?.style.display === 'none') {
      // tslint:disable-next-line: no-non-null-assertion
      d!.style.display = 'flex';
      // tslint:disable-next-line: no-non-null-assertion
      hidden!.innerText = 'Ukryj produkty';
    } else {
      // tslint:disable-next-line: no-non-null-assertion
      d!.style.display = 'none';
      // tslint:disable-next-line: no-non-null-assertion
      hidden!.innerText = 'Pokaż produkty';
    }
  }
}
