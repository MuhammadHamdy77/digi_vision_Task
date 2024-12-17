import { Component, OnInit } from '@angular/core';
import { ProductsModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent implements OnInit {
  // init prod variable
  product: ProductsModel | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {
    
  }
  ngOnInit(): void {
   this.getViewProduct()
  }
  // Get View product By Id
  getViewProduct(){
    // Get Id in query params
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // call Api
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    });
  }
}
