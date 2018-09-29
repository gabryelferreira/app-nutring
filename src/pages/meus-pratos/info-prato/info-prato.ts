import { MeusPratosPostService, MeusPratosGetService } from './../meus-pratos.service';
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
  providers: [
    MeusPratosPostService,
    MeusPratosGetService
  ]
})
export class InfoPratoPage {

  prato = [];
  foods = [];
  selectedTheme: String = "";
  page: string = "alimentos";
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, _settings: SettingsService,
              private post: MeusPratosPostService) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.prato = navParams.get("prato");
    this.getPratoInfoById(this.prato["id_prato"]);
  }

  async getPratoInfoById(id_prato: number){
    this.loading = true;
    let result = await this.post.getPratoInfoById(id_prato);
    if (result.success){
      this.foods = result.result;
    }
    this.loading = false;
  }

  ionViewDidLoad() {
  }

}
