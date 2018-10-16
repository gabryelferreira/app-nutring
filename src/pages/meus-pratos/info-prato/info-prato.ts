import { MeusPratosPostService, MeusPratosGetService } from './../meus-pratos.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../../settings/settings.service';
import { IUser } from '../../../app/types';

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
  user: IUser = {};

  loadingDelete: boolean = false;
  deleteText: string = "Tem certeza que deseja <b>excluir seu prato?</b> Você não poderá voltar atrás.";
  popupDelete: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, _settings: SettingsService,
              private post: MeusPratosPostService) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.prato = navParams.get("prato");
    this.getPratoInfoById(this.prato["id_prato"]);
  }

  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem("userData"));
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

  openDeletePopup(){
    this.popupDelete = true;
  }

  async deletePrato(){
    this.loadingDelete = true;
    let result = await this.post.deletePrato(this.user.id_usuario, this.prato["id_prato_feito"], this.prato["id_prato"]);
    if (result.success){

    }
    this.loadingDelete = false;
  }

}
