import { SettingsService } from './../settings/settings.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MeusPratosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-pratos',
  templateUrl: 'meus-pratos.html',
})
export class MeusPratosPage {

  selectedTheme: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private _settings: SettingsService) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  ionViewDidLoad() {
  }

}
