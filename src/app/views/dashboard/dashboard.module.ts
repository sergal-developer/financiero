import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    declarations: [
      DashboardComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    exports: [
      DashboardComponent
    ],
    providers: [],
  })
export class DashboardModule { }