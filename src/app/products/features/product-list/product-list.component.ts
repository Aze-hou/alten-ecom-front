import { Component, NO_ERRORS_SCHEMA, OnInit, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";
import { DataViewModule } from 'primeng/dataview';
import { CartService } from "./cart.service";
import { CommonModule } from "@angular/common";
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { FormsModule } from "@angular/forms";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [ FormsModule,DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent,CommonModule,RatingModule,TagModule],
  schemas : [NO_ERRORS_SCHEMA]
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  constructor(private cartService: CartService) {}
  
  ngOnInit() {
    this.productsService.get().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  public isOncard(product: Product){
    return this.cartService.getItem(product.code) !== undefined; 
  }



  getRating(product : Product) : Number{
    if (product.rating) {
      return Number(product.rating);
    } else return 0;
  }

  getSeverity(inventoryStatus: string):  'success' | 'warning' | 'danger' | 'info'   {
    switch (inventoryStatus) {
      case 'INSTOCK':
        return 'success';   
      case 'LOWSTOCK':
        return 'warning';    
      case 'OUTOFSTOCK':
        return 'danger';     
      default:
        return 'info';     
    }
  }


  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}
