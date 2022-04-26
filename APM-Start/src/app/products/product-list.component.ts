import { OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";


@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  errorMessage: string = "";

  constructor(private productservice: ProductService) {
    
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    }

  pageTitle: string = 'Product list';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value)
    console.log(`listFilter setter {value}`)
  }

  filteredProducts: IProduct[] = [];

  products: IProduct[] = [];

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    console.log('ProductListComponent');
    this.sub = this.productservice.getProducts().subscribe({
      next: products => {
        this.products = products,
          this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err,
    });
    
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
