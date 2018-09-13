import { SettingsService } from './../../settings/settings.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactUsGetService, ContactUsPostService } from '../contact-us.service';

/**
 * Generated class for the ContactMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-messages',
  templateUrl: 'contact-messages.html',
  providers: [
    ContactUsGetService,
    ContactUsPostService
  ]
})
export class ContactMessagesPage {

  selectedTheme: String = "";
  user = [];
  messages = [];
  messagesByDate = [];
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private _settings: SettingsService, private post: ContactUsPostService) {
    this._settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.getUserMessages(this.user["id_usuario"]);
  }

  async getUserMessages(id_usuario: number){
    this.messagesByDate = [];
    this.messages = [];
    this.loading = true;
    let result = await this.post.getUserMessages(id_usuario);
    if (result.success){
      this.messagesByDate = [];
      let groupByDate = [];
      let messages = result.result
      messages.forEach(element => {
        if (groupByDate.indexOf(element.dt_duvida) == -1)
          groupByDate.push(element.dt_duvida);
      });
        groupByDate.forEach(element => {
        let filtered = messages.filter(e => {
          if (e.dt_duvida == element)
            return true;
          return false;
        });
        if (filtered && filtered.length > 0)
          this.messagesByDate.push({dt_duvida: element, messages: filtered})
      });

    }
    this.loading = false;
  }

  ionViewDidLoad() {
  }

}
