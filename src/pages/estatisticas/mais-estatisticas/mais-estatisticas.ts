import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../../settings/settings.service';
import * as service from '../estatisticas.service';
import * as types from '../../../app/types';
@IonicPage()
@Component({
  selector: 'page-mais-estatisticas',
  templateUrl: 'mais-estatisticas.html',
  providers: [
    service.EstatisticasPostService,
    service.EstatisticasGetService
  ]
})
export class MaisEstatisticasPage {

  selectedTheme: String = "";
  loading: boolean = false;
  user: types.IUser = {};
  dt_consumo: string = "";

  informacoesConsumo = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private post: service.EstatisticasPostService,
              private get: service.EstatisticasGetService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
  }

  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.dt_consumo = this.navParams.get("dt_consumo");
    this.getTudoConsumidoNoDia(this.user.id_usuario, this.dt_consumo);
  }

  ionViewDidLoad() {
  }

  async getTudoConsumidoNoDia(id_usuario: number, dt_consumo: string){
    this.loading = true;
    let result = await this.get.getTudoConsumidoNoDia(id_usuario, dt_consumo);
    if (result.success){
      this.informacoesConsumo = result.result;
    }
    this.loading = false;
  }

}
