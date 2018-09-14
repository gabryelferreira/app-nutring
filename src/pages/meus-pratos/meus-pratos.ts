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
  pratosByDate = [];
  id_usuario: number;
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _settings: SettingsService,
                private post: MeusPratosPostService) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.id_usuario = parseInt(JSON.parse(localStorage.getItem("userData")).id_usuario);
    this.getPratosByIdUser(this.id_usuario)
  }

  ionViewWillEnter() {
  }

  refreshHistory(){
    this.getPratosByIdUser(this.id_usuario);
  }

  async getPratosByIdUser(id_usuario: number){
    this.loading = true;
    this.pratosByDate = [];
    let result = await this.post.getPratosByIdUser(id_usuario);
    if (result.success){
      this.pratosByDate = [];
      let groupByDate = [];
      let pratos = result.result
      pratos.forEach(element => {
        if (groupByDate.indexOf(element.dt_consumo) == -1)
          groupByDate.push(element.dt_consumo);
      });
        groupByDate.forEach(element => {
        let filtered = pratos.filter(e => {
          if (e.dt_consumo == element)
            return true;
          return false;
        });
        if (filtered && filtered.length > 0)
          this.pratosByDate.push({dt_consumo: element, pratos: filtered})
      });

    }
    this.loading = false;
    // if (result.success){
    //   let groupByDate = [];
    //   let groupByPrato = [];
    //   this.pratosByDate = [];
    //   let pratos = result.result;
    //   pratos.forEach(element => {
    //     if (groupByDate.indexOf(element.dt_consumo) == -1)
    //       groupByDate.push(element.dt_consumo);
    //     if (groupByPrato.indexOf(element.id_prato) == -1)
    //       groupByPrato.push(element.id_prato)
    //   });
    //   groupByDate = groupByDate.reverse();
    //   let pratosAgrupados = [];
    //   groupByPrato.forEach(element => {
    //     let filtered = pratos.filter(e => {
    //       if (e.id_prato == element)
    //         return true;
    //       return false;
    //     });
    //     if (filtered && filtered.length > 0){
    //       let allKcal = 0;
    //       let allQuantidade = 0;
    //       filtered.forEach(element => {
    //         allKcal += parseInt(element.kcal);
    //         allQuantidade += parseInt(element.quantidade);
    //       });
    //       pratosAgrupados.push({dt_consumo: filtered[0].dt_consumo, hr_consumo: filtered[0].hr_consumo, kcal: allKcal, quantidade: allQuantidade, alimentos: filtered});
    //     }
        
          
    //   });
    //   console.log("pratos agrupados = ", pratosAgrupados)

    //   groupByDate.forEach(element => {
    //     let filtered = pratosAgrupados.filter(e => {
    //       if (e.dt_consumo == element)
    //         return true;
    //       return false;
    //     });
    //     if (filtered && filtered.length > 0)
    //       this.pratosByDate.push({dt_consumo: element, pratos: filtered})
    //   });
      
    //   console.log("Pratos agrupados por data = ", this.pratosByDate)
    // }
  }

  openPrato(prato){
    this.navCtrl.push(InfoPratoPage, {
      prato: prato
    })
  }

  ionViewDidLoad() {
  }

  swipe(ev: any){
    if(ev.direction === 2) {
      this.navCtrl.parent.select(4);
    }
    if(ev.direction === 4){
      this.navCtrl.parent.select(2);
    }
  }
}
