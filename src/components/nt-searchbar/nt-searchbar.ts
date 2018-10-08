import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { ValueAccessorBase } from '../../app/value-accessor-base';
import { HideService } from '../../app/hide.service';
 
@Component({
    selector: 'nt-searchbar',
    templateUrl: './nt-searchbar.html',
    providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NtSearchbarComponent,
    multi: true
  }, HideService],
})
export class NtSearchbarComponent {

  // @Input("item") item;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @Output() backButton: EventEmitter<any> = new EventEmitter();
  @Input('placeholder') placeholder = "Pesquisar...";
  @Input('onHeader') onHeader = false;
  @Input('text') text = "";
  @Input('withIcon') withIcon = true;
  item: String = "";

  constructor(public hide:HideService){
    
  }

  hideTab() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(51px)';
      });
    } // end if
  }

  showTab() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(0)';
      });
    } // end if
  }

  ngAfterViewInit(){
  }

  setHide(val){
    this.hide.setShow(val)
  }

  goBack(){
    this.backButton.emit();
  }

  clear(){
    this.callback.emit("");
    this.text = "";
  }

  onChange(){
    this.callback.emit(this.item);
  }

}