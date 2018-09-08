import { MeusPratosPostService, MeusPratosGetService } from './meus-pratos.service';
import { SettingsService } from './../settings/settings.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InfoPratoPage } from './info-prato/info-prato';

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
  providers: [
    MeusPratosPostService,
    MeusPratosGetService
  ]
})
export class MeusPratosPage {

  selectedTheme: String = "";
  pratos = [];
  pratosByDate = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _settings: SettingsService,
                private post: MeusPratosPostService) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    let id_usuario = parseInt(JSON.parse(localStorage.getItem("userData")).id_usuario);
    this.getPratosByIdUser(id_usuario)
  }

  async getPratosByIdUser(id_usuario: number){
    let result = await this.post.getPratosByIdUser(id_usuario);
    console.log("result = ", result)
    if (result.success){
      let groupByDate = [];
      let groupByPrato = [];
      let pratos = result.result;
      pratos.forEach(element => {
        if (groupByDate.indexOf(element.dt_consumo) == -1)
          groupByDate.push(element.dt_consumo);
        if (groupByPrato.indexOf(element.id_prato) == -1)
          groupByPrato.push(element.id_prato)
      });
      groupByPrato.forEach(element => {
        
      });
      let pratosAgrupados = [];
      groupByPrato.forEach(element => {
        let filtered = pratos.filter(e => {
          if (e.id_prato == element)
            return true;
          return false;
        });
        if (filtered && filtered.length > 0){
          let allKcal = parseInt(filtered[0].kcal);
          if (filtered.length > 1){
            allKcal = filtered.reduce((a, b) => ({x: parseInt(a.kcal) + parseInt(b.kcal)}));
            allKcal = allKcal["x"];
          }
          pratosAgrupados.push({dt_consumo: filtered[0].dt_consumo, hr_consumo: filtered[0].hr_consumo, kcal: allKcal, prato: filtered});
        }
        
          
      });
      console.log("pratos agrupados = ", pratosAgrupados)

      groupByDate.forEach(element => {
        let filtered = pratosAgrupados.filter(e => {
          if (e.dt_consumo == element)
            return true;
          return false;
        });
        if (filtered && filtered.length > 0)
          this.pratosByDate.push({dt_consumo: element, alimentos: filtered})
      });
      
      console.log("Pratos agrupados por data = ", this.pratosByDate)

      this.pratos = result.result
    }
  }

  openPrato(prato){
    console.log("prato = ", prato)
    this.navCtrl.push(InfoPratoPage, {
      prato: prato
    })
  }

  ionViewDidLoad() {
  }

}
