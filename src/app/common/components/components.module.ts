import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from './panel/panel.module';

@NgModule({
  imports: [
    PanelModule
  ],
  exports: [
    PanelModule
  ]
})
export class ComponentsModule { }
