import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../settings/settings.service';
import { HomePostService } from '../home/home.service';
import { IUser } from '../../app/types';
import { CommentsPage } from '../home/comments/comments';
import * as types from '../../app/types';

/**
 * Generated class for the VerPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-post',
  templateUrl: 'ver-post.html',
  providers: [
    HomePostService
  ]
})
export class VerPostPage {

  selectedTheme: String = "";
  selectedPost = {};
  user: IUser = {};
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private post: HomePostService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem("userData"));
  }

  ionViewDidLoad() {
    let post = this.navParams.data.post;
    this.getPostById(post.id_post, this.user.id_usuario);
  }

  ionViewWillEnter(){
    
  }

  async getPostById(id_post: number, id_usuario: number){
    this.loading = true;
    let result = await this.post.getPostById(id_post, id_usuario);
    if (result.success){
      this.selectedPost = result.result[0];
    }
    this.loading = false;
  }

  async likeUnlikePost(post: types.IPost){
    post.gostei = !post.gostei;
    if (!post.curtidas) post.curtidas = 0
    if (post.gostei){
      post.curtidas = post.curtidas + 1;
    } else {
      post.curtidas = post.curtidas - 1;
    }
    this.post.likeUnlikePost(post.id_post, this.user.id_usuario);
  }

  openPostComments(post: types.IPost){
    this.navCtrl.push(CommentsPage, {
      selectKeyboard: true,
      post: post
    })
  }

  async commentPost(post: types.IPost){
    if (post.actualComment && post.actualComment.length > 0){
      let comentario = post.actualComment;
      post.actualComment = "";
      let result = await this.post.commentPost(post.id_post, this.user.id_usuario, comentario);
    }
  }

  seeComments(post: any){
    this.navCtrl.push(CommentsPage, {
      post: post
    })
  }

}
