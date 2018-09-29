import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../../settings/settings.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  user;
  profileImage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private sanitizer: DomSanitizer) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem("userData"));

    if (this.user.foto){
      this.profileImage = sanitizer.bypassSecurityTrustStyle(`url(${this.user.foto})`);
    } else {
      let url = '../../../assets/imgs/user.jpg';
      this.profileImage = sanitizer.bypassSecurityTrustStyle(`url(${url})`);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

}
