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
  user: types.IUser = {};
  profileImage;
  comment: string = "";

  comments: types.IPostComment[] = []

  selectedPost: types.IPost = {};
  loading: boolean = false;
  selectedComments: types.IPostComment[] = [];
  allSelectedIsMine: boolean = false;

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
    let result = await this.post.getCommentsByIdPost(this.selectedPost.id_post, this.user.id_usuario, this.comments.length);
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

  async likeUnlikeComment(comment: types.IPostComment){
    comment.gostei = !comment.gostei;
    if (comment.gostei){
      comment.curtidas += 1;
    } else {
      comment.curtidas -= 1;
    }
    this.post.likeUnlikeComment(comment.id_comentario, this.user.id_usuario);
  }

  async commentPost(){
    if (this.comment && this.comment.length > 0){
      var id_comentario = -Math.floor((Math.random() * 1000000) + 1);
      var comment = {
        id_comentario: id_comentario,
        id_usuario: this.user.id_usuario,
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
      let result = await this.post.commentPost(this.selectedPost.id_post, this.user.id_usuario, comment.comentario);
      if (result.success){
        var data = result.result;
        this.comments.forEach(element => {
          if (element.id_comentario == id_comentario){
            element.id_comentario = data.id_comentario;
          }
        });
      }
    }
  }

  openOptions(comment: types.IPostComment){
    var isSelected = false;
    var comments = this.selectedComments.filter(element => {
      if (element.id_comentario == comment.id_comentario){
        isSelected = true;
        comment.selecionado = false;
        return false;
      }
        return true;
    });
    if (!isSelected){
      comment.selecionado = true;
      comments.push(comment);
    }
    this.selectedComments = comments;
    var allSelectedIsMine = true;
    this.selectedComments.forEach(element => {
      if (element.id_usuario != this.user.id_usuario){
        allSelectedIsMine = false;
        return;
      }
    });
    this.allSelectedIsMine = allSelectedIsMine;
  }

  closeOptions(){
    this.selectedComments = [];
    this.comments.forEach(element => {
      element.selecionado = false;
    });
  }

  deleteComments(){
    var selectedComments = [];
    var commentsIds = [];
    this.selectedComments.forEach(element => {
      selectedComments.push(element);
      commentsIds.push(element.id_comentario);
    });
    
    this.selectedComments = [];
    var allComments = this.comments.filter(element => {
      if (commentsIds.indexOf(element.id_comentario) != -1){
        return false;
      }
      return true;
    });
    this.comments = allComments;
    
    this.post.deleteComments(JSON.stringify(selectedComments));
  }

}
