import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { EmitFields } from '../../models/EmitFields.entity';

@Component({
  selector: 'panel-component',
  templateUrl: './panel.html',
  styleUrls: ['./panel.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class PanelComponent implements OnInit {
  //#region INPUT/OUTPUT
  @Input() id: String = 'input';
  @Input() title: string = '';
  @Input() size = 'small';
  @Input() direction = 'left';
  @Input() closeOnClickOverlap = false;
  @Input() customClass = '';
  @Input() showClose = true;
  @Output() afterChange: EventEmitter<any> = new EventEmitter();
  //#endregion

  //#region INTERNAL-PROPERTIES
  protected _open: any;
  @Input()
  get open(): any {
      return this._open;
  }
  @Output() openChange = new EventEmitter();
  set open(v: any) {
      if (v !== this._open) {
          this._open = v;
          this.openChange.emit(this._open);
          // this.updateFixBody();
          // this.afterChange.emit( new EmitFields(this.id, this.open == null ? false : true, this._open) );
      }
  }

  //#region LIFECYCLE
  constructor() { }

  ngOnInit() {
  }

  //#endregion

  //#region EVENTS
  close(evt?: any) { 
    evt?.preventDefault();
    this.open = false;
    this.afterChange.emit( new EmitFields('PANEL_CLOSE', true, { action: 'close', value: false } ) );
  }

  closeInOverlap() {
    if ( this.closeOnClickOverlap ) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(evt: KeyboardEvent) {
      this.close();
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
