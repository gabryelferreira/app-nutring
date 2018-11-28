import { PrincipalPage } from './../../principal/principal';
import { MeusPratosPage } from './../../meus-pratos/meus-pratos';
import { SettingsService } from '../../settings/settings.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { VerPratoPostService, VerPratoGetService } from './ver-prato.service';
import { MontarPratoPage } from '../../montar-prato/montar-prato';
import { IUser } from '../../../app/types';

/**
 * Generated class for the VerPratoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-prato',
  templateUrl: 'ver-prato.html',
  providers: [
    VerPratoPostService,
    VerPratoGetService
  ]
})
export class VerPratoPage {

  selectedTheme: String = "";
  refeicao:any;
  type:string;
  foods = [];
  callback;

  public searchInput = {
    shouldShowCancel: false,
    searchText: ""
  }
  
  offset: number = 0;

  sendPrato = [];
  loading: boolean = false;
  confirmText: string = "Deseja montar seu prato?";
  popupOpen: boolean = false;
  popupCheck: boolean = false;
  checkText: string = "Seu prato foi feito com sucesso."
  montandoPrato: boolean = false;
  user: IUser = {};
  prato;
  where: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private settings: SettingsService,
              private post: VerPratoPostService, private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
    settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  ionViewWillEnter() {
    this.refeicao = this.navParams.get("refeicao");
    this.type = this.navParams.get("type");
    this.user = JSON.parse(localStorage.getItem("userData"));
    let foods = this.navParams.get("foods");
    if (foods && foods.length > 0)
      this.foods = foods;
    this.where = this.navParams.get("where");
  }

  ionViewWillLeave() {
    // this.callback(this.foods).then(()=>{
    // });
  }

  ionViewDidLoad() {
  }

  selectFood(food: any){
    food["selected"] = !food["selected"];
  }

  mudarPorcao(porcao: number, food: any){
    this.foods.forEach((element, index) => {
      if (element.id_alimento == food.id_alimento){
        if (porcao == 0){
          element.selected = false;
          this.foods.splice(index, 1);
        }
        return;
      }
    });
  }

  async montarPrato(){
    this.loading = true;
    let id_usuario = JSON.parse(localStorage.getItem("userData")).id_usuario;
    this.sendPrato = [];
    let result;
    this.foods.forEach(element => {
      this.sendPrato.push({id_usuario: parseInt(id_usuario), id_alimento: parseInt(element.id_alimento), quantidade: parseInt(element.porcao_consumo)})
    });
    if (this.where == "editPrato"){
      result = await this.post.updatePrato(JSON.stringify(this.sendPrato), JSON.stringify(this.refeicao), this.type);
    } else {
      result = await this.post.createPrato(JSON.stringify(this.sendPrato), JSON.stringify(this.refeicao), this.type);
    }
    
    if (result.success){
      localStorage.setItem("loadHistorico", "true");
      localStorage.setItem("loadRefeicoes", "true");
      this.reloadUserInfo();
    }
    this.loading = false;
    this.popupOpen = false;
    this.popupCheck = true;
  }

  async reloadUserInfo(){
    let result = await this.post.reloadUserInfo(this.user.id_usuario);
    if (result.success){
      this.user = result.result;
      localStorage.setItem("userData", JSON.stringify(result.result));
    }
  }

  presentConfirm() {
    this.popupOpen = true;
  }

  verPrato(){
    this.popupCheck = false;
    if (this.where == 'editPrato'){
      this.navCtrl.pop();
    } else {
      localStorage.setItem("reloadEstatisticas", "true");
      this.navCtrl.popToRoot();
    }
  }

  closePrato(){
    this.navCtrl.pop();
  }

  myCallbackFunction = _params => {
    return new Promise((resolve, reject) => {
      if (_params){
        let exists = false;
        for (var i = 0; i < this.foods.length; i++){
          if (this.foods[i].id_alimento == _params.id_alimento){
            this.foods[i] = _params;
            exists = true;
            break;
          }
        }
        if (!exists)
          this.foods.push(_params);
      }
        
      resolve();
    });
  };

  openSearch(){
    this.navCtrl.push('SearchPage', {
      type: 'montarPrato',
      refeicao: this.refeicao,
      callback: this.myCallbackFunction
    })
  }

  editAlimento(food: any){
    this.navCtrl.push("OpcoesAlimentoPage", {
      food,
      refeicao: this.refeicao,
      callback: this.myCallbackFunction
    })
  }

  deleteAlimento(food: any){
    for (var i = this.foods.length - 1; i >= 0; i--){
      if (this.foods[i].id_alimento == food.id_alimento){
        this.foods.splice(i, 1);
        break;
      }
    }
  }

}
