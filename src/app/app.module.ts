import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ProductsComponent } from './components/products/products.component';
import { PanelTopComponent } from './components/panel-top/panel-top.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MenuComponent } from './components/admin/menu/menu.component';
import { AdmProductsComponent } from './components/admin/adm-products/adm-products.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrdersComponent } from './components/admin/orders/orders.component';

import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule, FaIconLibrary} from '@fortawesome/angular-fontawesome';
import { faTools, faShoppingBag, faArrowUp, faSearch, faArrowLeft, faArrowRight, faImage,
  faPlusSquare, faMinusSquare, faEuroSign, faCashRegister } from '@fortawesome/free-solid-svg-icons';

const appRoutes: Routes = [
  { path: 'cart', component: CartComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'adm_dashboard', component: DashboardComponent },
  { path: 'adm_products', component: AdmProductsComponent },
  { path: 'adm_orders', component: OrdersComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ProductsComponent,
    PanelTopComponent,
    CartComponent,
    DashboardComponent,
    MenuComponent,
    AdmProductsComponent,
    FooterComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTools, faShoppingBag, faArrowUp, faSearch, faArrowLeft, faArrowRight, faImage,
      faPlusSquare, faMinusSquare, faEuroSign, faCashRegister);
  }
}
