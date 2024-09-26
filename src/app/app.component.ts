import {
  Component,
  signal,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { DialogModule } from "primeng/dialog";
import { CartService } from "./products/features/product-list/cart.service";
import { CommonModule } from "@angular/common";
import { ProductsService } from "./products/data-access/products.service";
import { Product } from "./products/data-access/product.model";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from "primeng/dataview";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    RouterModule,
    SplitterModule,
    ToolbarModule,
    PanelMenuComponent,
    DialogModule,
    CommonModule,DataViewModule, CardModule, ButtonModule,
    FormsModule,
    BadgeModule,
    InputTextModule,],
})
export class AppComponent {
  title = "ALTEN SHOP";
  cartItemCount = 0;
  public isDialogVisible = false;

  constructor(private cartService: CartService, private productsService: ProductsService) {
    this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart.length;
    });
  }

  showCard(){
    this.isDialogVisible = true;
  }

  cardProducts(){
    return this.cartService.getProducts()
  }
  
  deleteFromCart(product: Product){
    return this.cartService.removeFromCart(product); 
  }
}
