import { Component, ViewChild } from '@angular/core';
import { DashboardComponent } from './views/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DashboardComponent) dashboard!: DashboardComponent;
  inputName = '';
  createPopup = false;

  constructor() {}

  goProfile() {}

  goHome() {}

  goNewBudget() {
    this.createPopup = true;
    console.log('this.dashboard: ', this.dashboard);
  }

  action(event: any) {
    this.createPopup = false;
    if ( event.action === 'save' ) {
      this.dashboard.ngOnInit();
    }
  }
}
