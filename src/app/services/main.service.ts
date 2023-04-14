import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  @Injectable({
    providedIn: 'root'
  })
  productsRequest = { // obiekt z kryteriami, na podstawie których będziemy szukać produktów
    action: 'getProducts',
    name: '',
    category: ''
  };

  products: any; // Tutaj wyląduje obiekt z produktami - odpowiedź API i bazy danych na naszą prośbę
  apiPath = 'http://jakubadamus.cba.pl/xhr.php?'; // Ścieżka do naszego api

  cart: any[] = [];

  // tslint:disable-next-line: typedef
  getProducts(productsRequest?: {action: string; name: string; category: string; } ) { //  Pobiera produkty poprzez API
    const s = new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      const SQL = ('object=' + encodeURIComponent(JSON.stringify(productsRequest)));
      console.log(this.apiPath + SQL);
      xhttp.open('GET', this.apiPath + SQL, true);
      xhttp.send();
      // tslint:disable-next-line: typedef
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const resultObject = JSON.parse(xhttp.responseText);
          if (resultObject !== null) { resolve(resultObject); }
          else { reject('Failed'); }
        }
      };
    });
    s.then((onmessage: any) => {
      this.products = onmessage;
      console.log(this.products);
    }).catch((onmessage) => {
      console.log('Coś poszło nie tak podczas wczytywania produktów!');
    });
  }
  // tslint:disable-next-line: typedef
  addProduct(newProduct: any) {
    const s = new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      const request = { action: 'addProduct', newProduct };
      const SQL = ('object=' + encodeURIComponent(JSON.stringify(request)));
      console.log(this.apiPath + SQL);
      xhttp.open('GET', this.apiPath + SQL, true);
      xhttp.send();
      // tslint:disable-next-line: typedef
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const resultObject = JSON.parse(xhttp.responseText);
          if (resultObject !== null) { resolve(resultObject); }
          else { reject('Failed'); }
        }
      };
    });
    s.then((onmessage: any) => {
      console.log('Pomyślnie dodano nowy produkt!');
    }).catch((onmessage) => {
      console.log('Coś poszło nie tak podczas dodawania nowego produktu!');
    });
  }
  // tslint:disable-next-line: typedef
  removeProduct(id: any) {
    const s = new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      const request = { action: 'removeProduct', id };
      const SQL = ('object=' + encodeURIComponent(JSON.stringify(request)));
      console.log(this.apiPath + SQL);
      xhttp.open('GET', this.apiPath + SQL, true);
      xhttp.send();
      // tslint:disable-next-line: typedef
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const resultObject = JSON.parse(xhttp.responseText);
          if (resultObject !== null) { resolve(resultObject); }
          else { reject('Failed'); }
        }
      };
    });
    s.then((onmessage: any) => {
      console.log('Pomyślnie usunięto produkt!');
    }).catch((onmessage) => {
      console.log('Coś poszło nie tak podczas usuwania produktu!');
    });
  }
  // tslint:disable-next-line: member-ordering
  orders: any;
  // tslint:disable-next-line: typedef
  getOrders() {
    const s = new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      const request = { action: 'getOrders' };
      const SQL = ('object=' + encodeURIComponent(JSON.stringify(request)));
      console.log(this.apiPath + SQL);
      xhttp.open('GET', this.apiPath + SQL, true);
      xhttp.send();
      // tslint:disable-next-line: typedef
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const resultObject = JSON.parse(xhttp.responseText);
          if (resultObject !== null) { resolve(resultObject); }
          else { reject('Failed'); }
        }
      };
    });
    s.then((onmessage: any) => {
      console.log('Pomyślnie pobrano zamówienia!');
      this.orders = onmessage;
    }).catch((onmessage) => {
      console.log('Coś poszło nie tak podczas pobierania zamówień!');
    });
    return s;
  }
}
