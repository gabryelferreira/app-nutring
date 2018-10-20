import { ContactMessagesPage } from './contact-messages/contact-messages';
import { SettingsService } from './../settings/settings.service';
import { ContactUsGetService, ContactUsPostService } from './contact-us.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
  providers: [
    ContactUsGetService,
    ContactUsPostService
  ]
})
export class ContactUsPage {

  message: String = "";
  selectedTheme: String = "";
  user = {};
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private post: ContactUsPostService, _settings: SettingsService, 
              private toastCtrl: ToastController) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.user = JSON.parse(localStorage.getItem("userData"));
  }

  async sendMessageToNutring(){
    this.loading = true;
    let data = {id_usuario: this.user["id_usuario"], duvida: this.message}
    let response = await this.post.sendMessageToNutring(JSON.stringify(data));
    if (response.success){
      this.message = "";
      this.showToast("Mensagem enviada!", "top");
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

  seeMessages(){
    this.navCtrl.push('ContactMessagesPage')
  }


  ionViewDidLoad() {
    
  }

}
