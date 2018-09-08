import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfoPratoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-prato',
  templateUrl: 'info-prato.html',
})
export class InfoPratoPage {

  prato = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.prato = navParams.get("prato");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPratoPage');
  }

}
