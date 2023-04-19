import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
    { path: 'cart', component: CartComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
