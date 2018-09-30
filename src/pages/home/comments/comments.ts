import { HomePostService } from './../home.service';
import * as types from './../../../app/types';
import { Component, ViewChild } from '@angular/core';
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
  providers: [
    HomePostService
  ],
  queries: {
    content: new ViewChild('content')
  }
})
export class CommentsPage {

  selectedTheme: String = "";
  user;
  profileImage;
  comment: string = "";

  comments: types.IPostComments[] = []

  selectedPost: types.IPost[] = [];
  loading: boolean = false;

  @ViewChild('content') content:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private sanitizer: DomSanitizer,
            private post: HomePostService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem("userData"));

    if (this.user.foto){
      this.profileImage = sanitizer.bypassSecurityTrustStyle(`url(${this.user.foto})`);
    } else {
      let url = '../../../assets/imgs/user.jpg';
      this.profileImage = sanitizer.bypassSecurityTrustStyle(`url(${url})`);
    }
  }

  async getComments(){
    this.loading = true;
    let result = await this.post.getCommentsByIdPost(this.selectedPost["id_post"], this.user.id_usuario, this.comments.length);
    if (result.success){
      this.comments = result.result;
    }
    this.loading = false;
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.selectedPost = this.navParams.data.post;
    this.getComments();
    // if (this.navParams.data.selectKeyboard){
    //   document.getElementById("send-comment").focus();
    // }
  }

  setLike(comment: any){
    comment.gostei = !comment.gostei;
    if (comment.gostei){
      comment.curtidas += 1;
    } else {
      comment.curtidas -= 1;
    }
    console.log("aa")
  }

  sendComment(){
    console.log("Enviando comentário");
    if (this.comment && this.comment.length > 0){
      var comment = {
        id_comment: 0,
        nome: this.user.nome,
        foto: this.user.foto,
        hora: "agora",
        comentario: this.comment,
        gostei: false,
        curtidas: 0
      }
      this.comments.push(comment)
      this.comment = "";
      setTimeout(() => {
        this.content.scrollToBottom(300);
      })
    }
  }

}
