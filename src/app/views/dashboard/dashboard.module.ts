import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/common/components/components.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    declarations: [
      DashboardComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ComponentsModule
    ],
    exports: [
      DashboardComponent
    ],
    providers: [],
  })
export class DashboardModule { }