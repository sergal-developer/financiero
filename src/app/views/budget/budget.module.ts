import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/common/components/components.module';
import { BudgetComponent } from './budget.component';


@NgModule({
    declarations: [
      BudgetComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ComponentsModule
    ],
    exports: [
      BudgetComponent
    ],
    providers: [],
  })
export class BudgetModule { }