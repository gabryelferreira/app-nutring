import { SettingsService } from './../settings/settings.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { VerPratoPostService, VerPratoGetService } from './ver-prato.service';
import { LoadingService } from '../../app/framework/loaders/loading.service';
import { MontarPratoPage } from '../montar-prato/montar-prato';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private settings: SettingsService,
              private post: VerPratoPostService, private loadingCtrl: LoadingService, private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
    settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  ionViewWillEnter() {
    this.callback = this.navParams.get("callback")
    this.foods = this.navParams.get("allSelectedFoods")
    this.foodsReturn = this.foods;
    this.foodsFiltered = this.foods;
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
    this.loadingCtrl.presentWithMessage("Montando prato")
    let id_usuario = JSON.parse(localStorage.getItem("userData")).id_usuario;
    this.sendPrato = [];
    this.foods.forEach(element => {
      this.sendPrato.push({id_usuario: parseInt(id_usuario), id_alimento: parseInt(element.id_alimento), quantidade: parseInt(element.porcao_comida)})
    });
    let result = await this.post.createPrato(this.sendPrato);
    let message = "";
    this.loadingCtrl.dismiss();
    if (result.success){
      message = "Prato feito com sucesso!";
    } else {
      message = "Ocorreu um erro! Tente novamente.";
    }
    this.loading = false;
    this.presentAlert("Sucesso", "Prato feito com sucesso!");
    
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Deseja montar seu prato?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.montarPrato();
          }
        }
      ]
    });
    alert.present();
  }

  presentAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(MontarPratoPage)
          }
        }
      ]
    });
    alert.present();
  }

}
