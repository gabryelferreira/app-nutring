import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SettingsService } from './settings.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private settings: SettingsService) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
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
      this.settings.setActiveTheme('dark-theme');
    else
      this.settings.setActiveTheme('light-theme');

  }

  logout() {
    localStorage.clear();
    location.reload();
  }

}
