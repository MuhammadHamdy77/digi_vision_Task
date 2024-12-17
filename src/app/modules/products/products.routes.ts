import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ViewProductComponent } from './components/view-product/view-product.component';

export const PRODUCTS_ROUTES: Routes = [
    {path:'' , component:ProductsComponent},
    {path:':id' , component:ViewProductComponent},
];
