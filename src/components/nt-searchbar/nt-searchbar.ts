import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { ValueAccessorBase } from '../../app/value-accessor-base';
 
@Component({
    selector: 'nt-searchbar',
    templateUrl: './nt-searchbar.html',
    providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NtSearchbarComponent,
    multi: true,
  }],
})
export class NtSearchbarComponent {

  // @Input("item") item;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @Output() backButton: EventEmitter<any> = new EventEmitter();
  @Input('placeholder') placeholder = "Buscar";
  @Input('onHeader') onHeader = false;
  item: String = "";

  constructor(){
  }

  ngAfterViewInit(){
  }

  goBack(){
    this.backButton.emit();
  }

  onChange(){
    this.callback.emit(this.item);
  }

}