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
  posts = [];
  selectedTheme: String = "";
  user: IUser = {
    altura_m: "",
    cep: "",
    usuario: "",
    telefone: "",
    sobrenome: "",
    sexo: "",
    email: "",
    senha: "",
    dt_nasc: "",
    peso_kg: "",
    foto: "",
    nome: "",
    id_usuario: 0
  };
  page = "pessoais";

  loadingOptional: boolean = false;
  loadingPersonal: boolean = false;

  checkOptional = [
    { field: "peso_kg", name: "Peso", end: "inválido" },
    { field: "altura_m", name: "Altura", end: "inválida" }
  ];
  optionalData = [];
  rate: number = 3.55245;
  stars = [
    { star: "md-star-outline", value: 1 },
    { star: "md-star-outline", value: 2 },
    { star: "md-star-outline", value: 3 },
    { star: "md-star-outline", value: 4 },
    { star: "md-star-outline", value: 5 }
  ];

  selectedTab: string = "user";

  tabs = [
    // { name: "food", image: "ios-paper-outline", selected: true },
    { name: "user", image: "ios-person-outline", selected: true },
    { name: "info", image: "ios-podium-outline", selected: false }
    
  ];

  profileImage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private toastCtrl: ToastController,
              private post: ProfilePostService, sanitizer: DomSanitizer) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem("userData"));

    if (this.user.foto) {
      this.profileImage = sanitizer.bypassSecurityTrustStyle(`url(${this.user.foto})`);
    } else {
      let url = "../../assets/imgs/user.jpg";
      this.profileImage = sanitizer.bypassSecurityTrustStyle(`url(${url})`);
    }
    this.getUserPosts(this.user.id_usuario, 9, 0);
    this.validateRate();
  }

  async ionViewWillEnter() {
  }

  async getUserPosts(id_usuario: number, limit: number, offset: number){
    let result = await this.post.getUserPosts(id_usuario, limit, offset);
    if (result && result.success){
      this.posts = result.result;
    }
    console.log("posts", this.posts)
    this.user = JSON.parse(localStorage.getItem("userData"));
  }

  openPostComments(post: IPost){
    this.navCtrl.push(VerPostPage, {
      post: post
    })
  }

  async likeUnlikePost(post: IPost){
    post.gostei = !post.gostei;
    if (!post.curtidas) post.curtidas = 0
    if (post.gostei){
      post.curtidas = post.curtidas + 1;
    } else {
      post.curtidas = post.curtidas - 1;
    }
    this.post.likeUnlikePost(post.id_post, this.user.id_usuario);
  }

  async doInfinite(infiniteScroll) {
    let result;
    result = await this.post.getUserPosts(
      this.user.id_usuario,
      9,
      this.posts.length
    );
    if (result && result.result.length > 0)
      result.result.forEach(item => this.posts.push(item));
    infiniteScroll.complete();
  }

  selectTab(tab) {
    this.selectedTab = tab["name"];
    this.tabs.forEach(tab => {
      tab.selected = false;
    });
    tab.selected = true;
  }

  editProfile() {
    this.navCtrl.push(EditProfilePage, {
      user: this.user
    });
  }

  openSettings() {
    this.navCtrl.push(SettingsPage);
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

  goBack(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {}
}
