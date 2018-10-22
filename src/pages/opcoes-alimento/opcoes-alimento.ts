import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../settings/settings.service';

/**
 * Generated class for the OpcoesAlimentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opcoes-alimento',
  templateUrl: 'opcoes-alimento.html',
})
export class OpcoesAlimentoPage {

  selectedTheme: String = "";
  callback: any;
  refeicao: any;
  food: any;
  updateOk: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.food = this.navParams.get("food");
    this.food["porcao_comida"] = "";
    this.refeicao = this.navParams.get("refeicao");
    this.callback = this.navParams.get("callback");
  }

  ionViewWillLeave(){
    if (this.updateOk){
      this.callback(this.food).then(()=>{
      });
    }
  }

  updatePrato(){
    this.updateOk = true;
    this.navCtrl.pop();
  }

}
