import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SettingsService } from '../settings/settings.service';
import * as service from './estatisticas.service';
import * as types from '../../app/types';

@IonicPage()
@Component({
  selector: 'page-estatisticas',
  templateUrl: 'estatisticas.html',
  providers: [
    service.EstatisticasPostService,
    service.EstatisticasGetService
  ]
})
export class EstatisticasPage {

  selectedTheme: String = "";
  user: types.IUser = {};
  loading: boolean = false;
  loadingKcal: boolean = false;

  //info usuario
  kcalConsumidas: number = 0;
  datasConsumo = [];
  dataConsumoSelecionada: string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private post: service.EstatisticasPostService,
              private get: service.EstatisticasGetService, private modalCtrl: ModalController) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.getData(); 
  }

  async getData(){
    this.loading = true;
    await this.getUserData();
    await this.getMonthsOfPratos();
    await this.getKcalConsumidaNoDia(this.user.id_usuario, this.dataConsumoSelecionada);
    this.loading = false;
  }

  async getUserData() {
    let result = await this.post.reloadUserInfo(this.user.id_usuario);
    if (result.success){
      this.user = result.result
      localStorage.setItem("userData", JSON.stringify(result.result));
    }

}

async getMonthsOfPratos(){
  let result = await  this.post.getMonthsOfPratos(this.user.id_usuario);
  if (result.success){
    for (var i = 0; i < result.result.length; i++){
      this.datasConsumo.push(result.result[i].full_date);
    }
    console.log("datas = ", this.datasConsumo)
    if (this.datasConsumo.length > 0){
      this.dataConsumoSelecionada = this.datasConsumo[0];
    }
  }
}

  async getKcalConsumidaNoDia(id_usuario: number, dt_consumo: string){
    this.loadingKcal = true;
    let result = await this.get.getKcalConsumidaNoDia(id_usuario, dt_consumo);
    if (result.success){
      this.kcalConsumidas = result.result;
    }
    this.loadingKcal = false;
  }

  ionViewDidLoad() {
  }

  goToMontarPrato(){
    this.navCtrl.push("PrincipalPage");
  }

  goToMaisEstatisticas(){
    this.navCtrl.push("MaisEstatisticasPage", { dt_consumo: this.dataConsumoSelecionada });
  }

  abrirDatas(){
    let datasModal = this.modalCtrl.create("EscolherDataPage", { datas: this.datasConsumo });
    datasModal.onDidDismiss(data => {
      if (data){
        this.dataConsumoSelecionada = data;
        this.getKcalConsumidaNoDia(this.user.id_usuario, data);
      }
    });
    datasModal.present();
  }

}
