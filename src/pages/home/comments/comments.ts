import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../../settings/settings.service';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  selectedTheme: String = "";
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

}
