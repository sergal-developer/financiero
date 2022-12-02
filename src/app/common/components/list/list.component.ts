import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { EmitFields } from '../../models/EmitFields.entity';
import { IBudget } from '../../models/interfaces';

@Component({
  selector: 'list-component',
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  //#region INPUT/OUTPUT
  @Input() id: String = 'list';
  @Input() list: Array<IBudget> = [];
  @Output() actionEvent: EventEmitter<any> = new EventEmitter();
  //#endregion

  //#region LIFECYCLE
  constructor() { }

  ngOnInit() {
  }

  //#endregion

  //#region EVENTS
  showDetails(item: IBudget) {
    item.details = !item.details;
  }

  edit(item: IBudget) {
    item.details = !item.details;
  }
  delete(item: IBudget) {
    item.details = !item.details;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(evt: KeyboardEvent) {
    // this.close();
  }

  // updateFixBody() {
  //   const body = document.querySelectorAll('body');
  //   if ( this.open ) {
  //       body[0].classList.add('fix-modal-body');
  //   } else {
  //       body[0].classList.remove('fix-modal-body');
  //   }
  // }
  //#endregion

  //#region CONVERTERS
  //#endregion

}
