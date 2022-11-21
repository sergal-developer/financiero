import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetComponent } from './budget.component';


@NgModule({
    declarations: [
      BudgetComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      
    ],
    exports: [
      BudgetComponent
    ],
    providers: [],
  })
export class BudgetModule { }