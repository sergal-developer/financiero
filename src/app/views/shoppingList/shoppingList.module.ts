import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/common/components/components.module';
import { ShoppingListComponent } from './shoppingList.component';


@NgModule({
    declarations: [
      ShoppingListComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ComponentsModule
    ],
    exports: [
      ShoppingListComponent
    ],
    providers: [],
  })
export class ShoppingListModule { }