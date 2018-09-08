import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../../settings/settings.service';

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
  selectedTheme: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private _settings: SettingsService) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.prato = navParams.get("prato");
    console.log("this", this.prato)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPratoPage');
  }

}
