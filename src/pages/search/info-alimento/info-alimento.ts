import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../../settings/settings.service';
import { IFood } from '../../../app/types';

/**
 * Generated class for the InfoAlimentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-alimento',
  templateUrl: 'info-alimento.html',
  providers: [
  ]
})
export class InfoAlimentoPage {

  prato = [];
  food:IFood;
  selectedTheme: String = "";
  page: string = "alimentos";
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, _settings: SettingsService) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.food = navParams.get("food");
  }

  ionViewDidLoad() {
  }

}
