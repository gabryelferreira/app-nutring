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
  @Input('img') img;

  text: String = "";
  classes: String = "c100 ";

  constructor() {
  }

  ngAfterViewInit(){
    this.percent = Math.floor(this.percent);
    this.text = this.percent.toString() + "%";
    this.classes = this.classes + "p" + this.percent.toString() + " " + this.color + " " + this.size;
    console.log("img = ", this.img)
    console.log("color = ", this.color)
  }

}
