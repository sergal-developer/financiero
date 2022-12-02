import { NgModule } from '@angular/core';
import { ListModule } from './list/list.module';
import { PanelModule } from './panel/panel.module';

@NgModule({
  declarations: [
    // FreshAutofocusDirective
  ],
  imports: [
    ListModule,
    PanelModule
  ],
  exports: [
    ListModule,
    PanelModule
  ]
})
export class ComponentsModule { }
