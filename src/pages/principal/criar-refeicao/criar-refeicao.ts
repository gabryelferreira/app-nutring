import { SettingsService } from './../../settings/settings.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CriarRefeicaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-refeicao',
  templateUrl: 'criar-refeicao.html',
})
export class CriarRefeicaoPage {

  selectedTheme: String = "";
  imageOptions: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
  }

  ionViewDidLoad() {
  }

}
