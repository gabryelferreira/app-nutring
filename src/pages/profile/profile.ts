import { VerPostPage } from './../ver-post/ver-post';
import { SettingsPage } from "./../settings/settings";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { SettingsService } from "../settings/settings.service";
import { elementEnd } from "@angular/core/src/render3/instructions";
import { ProfilePostService, ProfileGetService } from "./profile.service";
import { IUser, IPost } from "../../app/types";
import { EditProfilePage } from "./edit-profile/edit-profile";
import { DomSanitizer } from "@angular/platform-browser";
import { CommentsPage } from "../home/comments/comments";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
  providers: [ProfilePostService, ProfileGetService]
})
export class ProfilePage {
  // posts = [];
  
  selectedTheme: String = "";
  user: IUser = {};

  // rate: number = 3.55245;
  // stars = [
  //   { star: "md-star-outline", value: 1 },
  //   { star: "md-star-outline", value: 2 },
  //   { star: "md-star-outline", value: 3 },
  //   { star: "md-star-outline", value: 4 },
  //   { star: "md-star-outline", value: 5 }
  // ];

  selectedTab: string = "personalizadas";

  tabs = [
    { name: "personalizadas", text: "PERSONALIZADAS", selected: true },
    { name: "pratos", text: "PRATOS", selected: false }
    
  ];

  refeicoesCustom = [];

  profileImage: any;
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private toastCtrl: ToastController,
              private post: ProfilePostService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    
    // this.getUserPosts(this.user.id_usuario, 9, 0);
    // this.validateRate();
  }

  async ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem("userData"));
  }



  selectTab(tab) {
    this.selectedTab = tab["name"];
    this.tabs.forEach(tab => {
      tab.selected = false;
    });
    tab.selected = true;
  }

  editProfile() {
    this.navCtrl.push('EditProfilePage', {
      user: this.user
    });
  }

  openSettings() {
    this.navCtrl.push('SettingsPage');
  }

  

  goBack(){
    this.navCtrl.pop();
  }

  goToSettings(){
    this.navCtrl.push('SettingsPage');
  }

  openCriarRefeicao(){
    this.navCtrl.push('CriarRefeicaoPage', {
      callback: this.myCallbackFunction
    });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.getRefeicoes();
      resolve();
    });
  }

   async getRefeicoes(){
    this.loading = true;
    let result2 = await this.getRefeicoesCustom(this.user.id_usuario);
    this.loading = false;
  }

  async getRefeicoesCustom(id_usuario: number){
    let result = await this.post.getRefeicoesCustom(id_usuario);
    if (result.success){
      this.refeicoesCustom = result.result;
    }
  }

  

  ionViewDidLoad() {}










  //FUNCOES FUTURAS DE PERFIL COM REDE SOCIAL



  // validateRate() {
  //   let full = "md-star";
  //   let half = "md-star-half";
  //   let none = "md-star-outline";

  //   let rate = this.rate;

  //   this.stars.forEach(element => {
  //     if (element.value <= rate + 0.25) element.star = full;
  //     else if (element.value <= rate + 0.75) element.star = half;
  //     else element.star = none;
  //   });
  // }

    // async getUserPosts(id_usuario: number, limit: number, offset: number){
  //   let result = await this.post.getUserPosts(id_usuario, limit, offset);
  //   if (result && result.success){
  //     this.posts = result.result;
  //   }
  //   console.log("posts", this.posts)
  //   this.user = JSON.parse(localStorage.getItem("userData"));
  // }

  // openPostComments(post: IPost){
  //   this.navCtrl.push('VerPostPage', {
  //     post: post
  //   })
  // }

  // async likeUnlikePost(post: IPost){
  //   post.gostei = !post.gostei;
  //   if (!post.curtidas) post.curtidas = 0
  //   if (post.gostei){
  //     post.curtidas = post.curtidas + 1;
  //   } else {
  //     post.curtidas = post.curtidas - 1;
  //   }
  //   this.post.likeUnlikePost(post.id_post, this.user.id_usuario);
  // }

  // async doInfinite(infiniteScroll) {
  //   let result;
  //   result = await this.post.getUserPosts(
  //     this.user.id_usuario,
  //     9,
  //     this.posts.length
  //   );
  //   if (result && result.result.length > 0)
  //     result.result.forEach(item => this.posts.push(item));
  //   infiniteScroll.complete();
  // }


}
