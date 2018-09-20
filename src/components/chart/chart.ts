import { Component, Input } from '@angular/core';

/**
 * Generated class for the ChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chart',
  templateUrl: 'chart.html'
})
export class ChartComponent {

  @Input('percent') percent;
  @Input('color') color;
  @Input('size') size;
  @Input('text') text;
  @Input('img') img;

  classes: String = "c100 ";

  constructor() {
  }

  ngAfterViewInit(){
    this.percent = Math.floor(this.percent);
    if (!this.text)
      this.text = this.percent.toString() + "%";
    this.classes = this.classes + "p" + this.percent.toString() + " " + this.color + " " + this.size;
  }

}
