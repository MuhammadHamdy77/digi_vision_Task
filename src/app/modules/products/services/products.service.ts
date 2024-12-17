import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductsModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }


  getAllProduct(): Observable<ProductsModel[]>{
    return this.http.get<ProductsModel[]>('/assets/db/products.json');
  }

  getProductById(id: number): Observable<ProductsModel | undefined> {
    return this.getAllProduct().pipe(
      map((products: ProductsModel[]) => products.find((product: any) => product.id === id))
    );
  }
}
