import { EditRefeicoesPage } from './../edit-refeicoes/edit-refeicoes';
import { MontarPratoPage } from './../montar-prato/montar-prato';
import { SettingsService } from './../settings/settings.service';
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as service from './principal.service';
import * as types from '../../app/types';
import { CriarRefeicaoPage } from './criar-refeicao/criar-refeicao';
import { ScrollHideConfig } from '../../components/hide-on-scrolling/scroll-hide-directive';

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
  providers: [
    service.PrincipalPostService
  ]
})
export class PrincipalPage {
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 51 };
  selectedTheme: String = "";
  refeicoesPadroes = [];
  refeicoesCustom = [];
  loading: boolean = false;
  user: types.IUser = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private post: service.PrincipalPostService,
              private modalCtrl: ModalController) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.getRefeicoes();
    this.getUserData();
  }

  ionViewWillEnter(){
    if (localStorage.getItem("loadRefeicoes")){
      localStorage.removeItem("loadRefeicoes");
      this.getRefeicoes();
    }
  }

  async getUserData() {
      let result = await this.post.reloadUserInfo(this.user.id_usuario);
      if (result.success){
        this.user = result.result
        localStorage.setItem("userData", JSON.stringify(this.user));
        console.log("refresh", this.user)
      }
  }

  async getRefeicoes(){
    this.loading = true;
    let result = await this.getRefeicoesPadroes(this.user.id_usuario);
    let result2 = await this.getRefeicoesCustom(this.user.id_usuario);
    this.loading = false;
  }

  async getRefeicoesCustom(id_usuario: number){
    let result = await this.post.getRefeicoesCustom(id_usuario);
    if (result.success){
      this.refeicoesCustom = result.result;
    }
  }

  async getRefeicoesPadroes(id_usuario: number){
    let result = await this.post.getRefeicoesPadroes(id_usuario);
    if (result.success){
      this.refeicoesPadroes = result.result;
    }
  }

  openCriarRefeicao(){
    this.navCtrl.push('CriarRefeicaoPage', {
      callback: this.myCallbackFunction
    });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.getRefeicoes();
      resolve();
    });
   }

  openMontarPrato(refeicao: any, type: string){
    console.log("refeicao = ", refeicao)
    this.navCtrl.push('VerPratoPage', {
      refeicao: refeicao,
      type: type
    })
  }

  openEditarRefeicao(){
    this.navCtrl.push('EditRefeicoesPage', {
      refeicoes: this.refeicoesCustom,
      callback: this.myCallbackFunction
    });
  }

}
