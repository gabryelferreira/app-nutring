import { Component, Input } from '@angular/core';

/**
 * Generated class for the NtListHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'nt-list-header',
  templateUrl: 'nt-list-header.html'
})
export class NtListHeaderComponent {

  @Input ("text") text;

  constructor() {
  }

}
