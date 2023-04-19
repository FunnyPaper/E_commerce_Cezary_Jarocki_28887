import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmProductsComponent } from './adm-products/adm-products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'products', component: AdmProductsComponent },
            { path: 'orders', component: OrdersComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
