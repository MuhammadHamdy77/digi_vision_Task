import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ProductsModel } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    RouterModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  gridView:boolean = true;
  listView:boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  paginatedProducts: any[] = [];

  constructor(
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.getAllProduct();
  }
  // Update Pagination
  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }
  // if Change Pagination
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }
  // Get All Products
  getAllProduct(){
    this.productService.getAllProduct().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
      // Get Total Pages Count
      this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
      this.totalPagesArray = Array(this.totalPages).fill(0);
      this.updatePaginatedProducts();
    });
  }
  // Filter Product By Price Or Title
  filterProducts() {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || product.price == this.searchTerm
    );
    // Re Call Pagination Update
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0);
    this.updatePaginatedProducts();
  }
  // Change View Prod List Or grid
  changeView(view:any){
    if (view == 'listView') {
      this.listView = true;
      this.gridView = false;
    }else{
      this.listView = false;
      this.gridView = true;
    }
  }
  // Sort Products By Price Low to High Or High To Low
  onSortChange(event: Event): void {
    const sortDirection = (event.target as HTMLSelectElement).value;
    this.filteredProducts = this.sortProducts(this.products, sortDirection);
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0);
    this.updatePaginatedProducts();
  }
  sortProducts(products: ProductsModel[], direction: string): ProductsModel[] {
    return products.slice().sort((a, b) => {
      if (direction === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }
}
