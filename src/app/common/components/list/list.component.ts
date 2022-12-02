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

  //#region PROPERTIES
  current: IBudget = { description: '', date: 0, entry: false, value: 0 };
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
    item.details = false;
    item._editMode = true;
    this.current = item;
  }

  cancelEdit(item: IBudget) {
    item.details = false;
    item._editMode = false;
    this.current = { description: '', date: 0, entry: false, value: 0 };
  }

  delete(item: IBudget) {
    this.actionEvent.emit({action: 'DELETE', data: item });
  }

  save(item: IBudget) {
    item.details = false;
    item._editMode = false;
    this.actionEvent.emit({action: 'EDIT', data: item });
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(evt: KeyboardEvent) {
    // this.close();
  }

  //#endregion

  //#region CONVERTERS
  //#endregion

}
