import { SettingsService } from './../../settings/settings.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EscolherDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escolher-data',
  templateUrl: 'escolher-data.html',
})
export class EscolherDataPage {

  selectedTheme: String = "";
  datas = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private viewCtrl: ViewController) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
  }

  ionViewDidLoad() {
    this.datas = this.navParams.get("datas");
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

}
