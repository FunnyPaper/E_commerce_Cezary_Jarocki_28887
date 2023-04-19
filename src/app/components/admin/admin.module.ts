import { OrdersComponent } from './orders/orders.component';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmProductsComponent } from './adm-products/adm-products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';

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
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
    declarations: [
        AdminComponent,
        AdmProductsComponent,
        DashboardComponent,
        MenuComponent,
        OrdersComponent,
    ],
    imports: [CommonModule, ChartsModule, FontAwesomeModule, ReactiveFormsModule, AdminRoutingModule],
})
export class AdminModule {
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
