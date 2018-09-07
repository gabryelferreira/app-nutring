import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../settings/settings.service';

/**
 * Generated class for the MontarPratoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-montar-prato',
  templateUrl: 'montar-prato.html',
})
export class MontarPratoPage {

  selectedTheme: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private _settings: SettingsService) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  ionViewDidLoad() {
  }

}
