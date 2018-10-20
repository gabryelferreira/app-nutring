import { PrincipalPage } from './../../principal/principal';
import { MeusPratosPage } from './../../meus-pratos/meus-pratos';
import { SettingsService } from '../../settings/settings.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { VerPratoPostService, VerPratoGetService } from './ver-prato.service';
import { MontarPratoPage } from '../../montar-prato/montar-prato';

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

  foodsReturn = [];
  foodsFiltered = [];

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private settings: SettingsService,
              private post: VerPratoPostService, private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
    settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  ionViewWillEnter() {
    this.callback      = this.navParams.get("callback")
    this.foods         = this.navParams.get("allSelectedFoods")
    this.foodsReturn   = this.foods
    this.foodsFiltered = this.foods
    this.refeicao      = this.navParams.get("refeicao")
    this.type          = this.navParams.get("type")
  }

  ionViewWillLeave() {
    this.foods.forEach(element => {
      element.selected = false;
    });
    this.callback(this.foods).then(()=>{
    });
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
    this.foods.forEach(element => {
      this.sendPrato.push({id_usuario: parseInt(id_usuario), id_alimento: parseInt(element.id_alimento), quantidade: parseInt(element.porcao_comida)})
    });
    let result = await this.post.createPrato(JSON.stringify(this.sendPrato), JSON.stringify(this.refeicao), this.type);
    let message = "";
    let title = "";
    if (result.success){
      localStorage.setItem("loadHistorico", "true");
    }
    this.loading = false;
    this.popupOpen = false;
    this.popupCheck = true;
  }

  presentConfirm() {
    this.popupOpen = true;
  }

  verPrato(){
    this.popupCheck = false;
    this.navCtrl.popToRoot()
    //  setRoot(PrincipalPage)
    this.navCtrl.parent.select(2);
  }

}
