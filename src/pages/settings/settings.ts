import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SettingsService } from './settings.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as settings from './settings.service';
import * as types from '../../app/types';
import { ProfilePage } from '../profile/profile';
import { ContactUsPage } from '../contact-us/contact-us';
import { SugestaoAlimentoPage } from '../sugestao-alimento/sugestao-alimento';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  darkTheme: boolean = false;
  selectedTheme: String = "";
  sharing:settings.shareApp = {
    file : 'https://cdn-images-1.medium.com/max/800/0*KiK6x8QTY0PstmPU.png',
    message: 'Estou usando o Nutring, baixe agora na Play Store!',
    subject : null,
    url : 'https://cdn-images-1.medium.com/max/800/0*KiK6x8QTY0PstmPU.png'
  };
  user:types.IUser = {
    id_usuario: 0,
    nome: "",
    sobrenome: "",
    dt_nasc: "",
    sexo: "",
    email: "",
    usuario: "",
    peso_kg: "",
    altura_m: "",
    foto: "",
    cep: "",
    telefone: "",
    senha: ""
  }

  popupLogout: boolean = false;
  logoutText: string = "Tem certeza que deseja <b>fazer logout</b>?"

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private _settings: SettingsService, private socialSharing: SocialSharing) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.darkTheme = this.selectedTheme == "dark-theme";
  }

  ionViewWillEnter() {
    if (localStorage.getItem("userData")){
      let data = JSON.parse(localStorage.getItem("userData"));
      this.user.nome = data["nome"];
    }
  }

  ionViewDidLoad() {
  }

  showConfirmLogout() {
    this.popupLogout = true;
  }

  toggleDarkTheme(e) {
    if (this.darkTheme){
      this._settings.setActiveTheme('dark-theme');
      this._settings.setTabActiveTheme('dark-theme-tab');
    } else {
      this._settings.setActiveTheme('light-theme');
      this._settings.setTabActiveTheme('light-theme-tab');
    }
  }

  gotoPerfil(){
    this.navCtrl.push(ProfilePage);
  }

  share(){
    this.socialSharing.share(this.sharing.message, this.sharing.subject, this.sharing.file,this.sharing.url).then(()=>{

    }).catch(()=>{

    });
  }

  openContactUsPage(){
    this.navCtrl.push(ContactUsPage);
  }

  openSuggestionPage(){
    this.navCtrl.push(SugestaoAlimentoPage);
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

}
