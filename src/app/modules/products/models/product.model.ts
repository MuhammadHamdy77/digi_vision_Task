export class ProductsModel {
    id!: number;
    title!: string;
    price!: number;
    description!: string
    image!: string
    category!: string;
    rating!:{
        rate:number;
        count:number;
    }
  }
