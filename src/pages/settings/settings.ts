import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SettingsService } from './settings.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as settings from './settings.service'
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
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private _settings: SettingsService, private socialSharing: SocialSharing) {
    this._settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.darkTheme = this.selectedTheme == "dark-theme";
  }

  ionViewDidLoad() {
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Tem certeza que deseja sair?',
      buttons: [
        {
          text: 'Sair',
          handler: () => {
            this.logout();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {

          }
        }
      ]
    });
    confirm.present();
  }

  toggleDarkTheme(e) {
    if (this.darkTheme)
      this._settings.setActiveTheme('dark-theme');
    else
      this._settings.setActiveTheme('light-theme');
  }

  share(){
    this.socialSharing.share(this.sharing.message, this.sharing.subject, this.sharing.file,this.sharing.url).then(()=>{

    }).catch(()=>{

    });
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

}
