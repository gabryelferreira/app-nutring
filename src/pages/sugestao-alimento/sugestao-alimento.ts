import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SugestaoPostService } from './sugestao-aliment.service';
import { SettingsService } from '../settings/settings.service';

/**
 * Generated class for the SugestaoAlimentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sugestao-alimento',
  templateUrl: 'sugestao-alimento.html',
  providers: [
    SugestaoPostService
  ]
})
export class SugestaoAlimentoPage {
  alimento_nome:string = ""
  user = {}
  loading: boolean = false
  selectedTheme: String = ""
  descricao:string = ""

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private post: SugestaoPostService, _settings: SettingsService,
              private toastCtrl: ToastController) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.user = JSON.parse(localStorage.getItem("userData"));
  }

  async sendMessageToNutring(){
    this.loading = true;
    let sugestaoDeAlimento = {id_usuario: this.user["id_usuario"], alimento_nome: this.alimento_nome,descricao:this.descricao}
    let response = await this.post.addSugestaoDeAlimento(JSON.stringify(sugestaoDeAlimento));
    if (response.success){
      this.descricao = "";
      this.alimento_nome = "";
      this.showToast("Sugestão enviada!", "top");
    } else {
      this.showToast("Ocorreu um erro! Tente novamente.", "top");
    }
    this.loading = false;
  }

  showToast(message: string, position: string) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: false,
      duration: 2500,
      position: position
    });

    toast.present(toast);
  }

  seeSuggestions(){
    //this.navCtrl.push()
  }

  ionViewDidLoad() {
  }

}
