import { HomePostService } from './../home/home.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../settings/settings.service';
import * as types from '../../app/types';

/**
 * Generated class for the CurtidasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-curtidas',
  templateUrl: 'curtidas.html',
  providers: [
    HomePostService
  ]
})
export class CurtidasPage {

  selectedTheme: String = "";
  curtidores = [];
  user: types.IUser = {};
  selectedPost: types.IPost = {};
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private post: HomePostService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem("userData"));
  }

  ionViewDidLoad() {
    this.selectedPost = this.navParams.data.post;
    this.getCurtidores(this.selectedPost.id_post, this.user.id_usuario, this.curtidores.length)
  }

  async getCurtidores(id_post: number, id_usuario: number, offset: number){
    this.loading = true;
    let result = await this.post.getCurtidores(id_post, id_usuario, offset);
    if (result.success){
      this.curtidores = result.result;
    }
    this.loading = false;
  }

}
