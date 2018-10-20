import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Tabs } from "ionic-angular";
import { SettingsService } from "../settings/settings.service";
import * as types from "../../app/types";
import * as service from "./home.service";
import { PostPicturePage } from "../post-picture/post-picture";
import { CommentsPage } from "./comments/comments";
import { CurtidasPage } from "../curtidas/curtidas";
import { ProfilePage } from "../profile/profile";
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [service.HomePostService, service.HomeGetService]
})
export class HomePage {
  //merda
  selectedTheme: String = "";
  user: types.IUser = {
    altura_m: "",
    cep: "",
    dt_nasc: "",
    email: "",
    foto: "",
    id_usuario: 0,
    nome: "",
    peso_kg: "",
    senha: "",
    sexo: "",
    sobrenome: "",
    telefone: "",
    usuario: ""
  };

  kcalMeta: number = 0;
  kcalConsumida: number;
  imgTeste = "http://www.leisureopportunities.com/images/247215_898310.jpg";
  sizeTeste = "small";
  rate: number = 3.55245;
  stars = [
    { star: "md-star-outline", value: 1 },
    { star: "md-star-outline", value: 2 },
    { star: "md-star-outline", value: 3 },
    { star: "md-star-outline", value: 4 },
    { star: "md-star-outline", value: 5 }
  ];

  posts: types.IPost[] = []

  loading: boolean = false;

  constructor(private tabs: Tabs, public navCtrl: NavController,
              public navParams: NavParams, _settings: SettingsService,
              private post: service.HomePostService, private get: service.HomeGetService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.post.getDailyKcal(this.user.id_usuario).then(kcalMeta => (this.kcalMeta = kcalMeta.result.kcal_diaria));
    this.validateRate();
    this.getFeed();
  }

  async getFeed(){
    this.loading = true;
    let result = await this.post.getFeed(this.user.id_usuario, this.posts.length);
    if (result.success){
      this.posts = result.result;
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
    this.navCtrl.push('CommentsPage', {
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

  validateRate() {
    let full = "md-star";
    let half = "md-star-half";
    let none = "md-star-outline";

    let rate = this.rate;

    this.stars.forEach(element => {
      if (element.value <= rate + 0.25) element.star = full;
      else if (element.value <= rate + 0.75) element.star = half;
      else element.star = none;
    });
  }

  async ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem("userData"));
  }

  seeComments(post: types.IPost){
    this.navCtrl.push('CommentsPage', {
      post: post
    })
  }

  getCurtidores(post: types.IPost){
    this.navCtrl.push('CurtidasPage', {
      post: post
    })
  }

  visitUserPage(post: types.IPost){
    if (post.id_usuario == this.user.id_usuario){
      this.navCtrl.parent.select(4);
    } else {
      // this.navCtrl.push
    }
  }

  ionViewDidLoad() {}

  gotoFotoPage(){
    this.navCtrl.push('PostPicturePage');
  }

}
