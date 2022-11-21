import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { BudgetModule } from './views/budget/budget.module';
import { StorageLocal } from './database/session.storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    DashboardModule,
    BudgetModule
  ],
  providers: [ StorageLocal ],
  bootstrap: [AppComponent]
})
export class AppModule { }
