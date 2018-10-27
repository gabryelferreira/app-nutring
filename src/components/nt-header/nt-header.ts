import { Component } from '@angular/core';

/**
 * Generated class for the NtHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'nt-header',
  templateUrl: 'nt-header.html'
})
export class NtHeaderComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
