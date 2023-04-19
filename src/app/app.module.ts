import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { LandingComponent } from './components/landing/landing.component';
import { ProductsComponent } from './components/products/products.component';
import { PanelTopComponent } from './components/panel-top/panel-top.component';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';

import {
    FontAwesomeModule,
    FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
    faTools,
    faShoppingBag,
    faArrowUp,
    faSearch,
    faArrowLeft,
    faArrowRight,
    faImage,
    faPlusSquare,
    faMinusSquare,
    faEuroSign,
    faCashRegister,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        ProductsComponent,
        PanelTopComponent,
        CartComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(
            faTools,
            faShoppingBag,
            faArrowUp,
            faSearch,
            faArrowLeft,
            faArrowRight,
            faImage,
            faPlusSquare,
            faMinusSquare,
            faEuroSign,
            faCashRegister
        );
    }
}
