import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../settings/settings.service';

/**
 * Generated class for the EstatisticasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estatisticas',
  templateUrl: 'estatisticas.html',
})
export class EstatisticasPage {

  selectedTheme: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
  }

  ionViewDidLoad() {
  }

  goToMontarPrato(){
    this.navCtrl.push("PrincipalPage");
  }

  goToMaisEstatisticas(){
    this.navCtrl.push("MaisEstatisticasPage");
  }

}
