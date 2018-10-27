import { MeusPratosPostService, MeusPratosGetService } from './../meus-pratos.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
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
  popupCheck: boolean = false;
  checkText: string = "Seu prato foi excluído com sucesso.";

  constructor(public navCtrl: NavController, public navParams: NavParams, _settings: SettingsService,
              private post: MeusPratosPostService, private popoverCtrl: PopoverController) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    
  }

  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.prato = this.navParams.get("prato");
    this.getPratoInfoById(this.prato["id_prato"]);
    this.getNutritionalInfoByIdPrato(this.prato["id_prato"], this.user.id_usuario)
  }

  async getPratoInfoById(id_prato: number){
    this.loading = true;
    let result = await this.post.getPratoInfoById(id_prato);
    if (result.success){
      this.foods = result.result;
    }
    this.loading = false;
  }

  async getNutritionalInfoByIdPrato(id_prato: number, id_usuario: number){
    this.loading = true;
    let result = await this.post.getNutritionalInfoByIdPrato(id_prato, id_usuario);
    if (result.success){
      this.prato = result.result;
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
    this.loadingDelete = false;
    if (result.success){
      localStorage.setItem("loadHistorico", "true");
      localStorage.setItem("loadRefeicoes", "true");
      this.popupDelete = false;
      this.popupCheck = true;
      this.reloadUserInfo();
    }
  }

  async reloadUserInfo(){
    let result = await this.post.reloadUserInfo(this.user.id_usuario);
    if (result.success){
      this.user = result.result;
      localStorage.setItem("userData", JSON.stringify(this.user));
    }
  }

  goToHistorico(){
    this.popupCheck = false;
    this.navCtrl.parent.select(2);
  }

  openFoodInfo(food) {
    this.navCtrl.push('InfoAlimentoPage', { food, hasPorcao: true });
  }

  editPrato(){
    this.navCtrl.push('VerPratoPage', {
      refeicao: this.prato,
      foods: this.foods,
      where: 'editPrato'
    })
  }

  presentPopover(event){
    let popover = this.popoverCtrl.create('PopoverInfoPratoPage');
    popover.present({
      ev: event
    })
    
    popover.onDidDismiss(data => {
      if (data){
        if (data.action == 'edit'){
          this.editPrato();
        } else if (data.action == 'delete'){
          this.openDeletePopup();
        }
      }
    })
  }

}
