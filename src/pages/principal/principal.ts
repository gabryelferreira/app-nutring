import { MontarPratoPage } from './../montar-prato/montar-prato';
import { SettingsService } from './../settings/settings.service';
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as service from './principal.service';
import * as types from '../../app/types';
import { CriarRefeicaoPage } from './criar-refeicao/criar-refeicao';

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
  providers: [
    service.PrincipalPostService
  ]
})
export class PrincipalPage {

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
  }

  ionViewDidLoad() {
  }

  async getRefeicoes(){
    this.loading = true;
    let result = await this.getRefeicoesPadroes();
    let result2 = await this.getRefeicoesCustom(this.user.id_usuario);
    this.loading = false;
  }

  async getRefeicoesCustom(id_usuario: number){
    let result = await this.post.getRefeicoesCustom(id_usuario);
    if (result.success){
      this.refeicoesCustom = result.result;
    }
  }

  async getRefeicoesPadroes(){
    let result = await this.post.getRefeicoesPadroes();
    if (result.success){
      this.refeicoesPadroes = result.result;
    }
  }

  openCriarRefeicao(){
    this.navCtrl.push(CriarRefeicaoPage);
  }

  openMontarPrato(refeicao: any){
    this.navCtrl.push(MontarPratoPage, {
      prato: refeicao
    })
  }

}
