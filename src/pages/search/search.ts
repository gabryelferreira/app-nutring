import { SettingsService } from "./../settings/settings.service";
import * as service from "./search.service";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { ScrollHideConfig } from "../../components/hide-on-scrolling/scroll-hide-directive";
import { SearchResultPage } from "./search-result/search-result";
import { InfoAlimentoPage } from "./info-alimento/info-alimento";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html",
  providers: [service.SearchGetService, service.SearchPostService]
})
export class SearchPage {
  headerScrollConfig: ScrollHideConfig = {
    cssProperty: "margin-top",
    maxValue: 44
  };

  private foods = [];
  private users = [];
  old = [];

  lastType: string = "";
  showWelcome: number = 1;
  // viewMode: number = 0;
  maxViewMode: number = 1;
  selectedTheme: String = "";
  searched: string = "";
  loading: boolean = false;
  showSad: boolean = false;
  type: string;
  refeicao: any;
  callback: any;
  selectedFoodPrato: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private post: service.SearchPostService, private toastCtrl: ToastController,
              _settings: SettingsService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
  }

  ionViewWillEnter() {
    // if (this.lastType == "food") {
    //   this.foods = this.old;
    // } else if (this.lastType == "people") {
    //   this.users = this.old;
    // }

    this.type = this.navParams.get("type");
    this.refeicao = this.navParams.get("refeicao");
    this.callback = this.navParams.get("callback");

  }

  ionViewWillLeave(){
    if (this.type == "montarPrato"){
      this.callback(this.selectedFoodPrato).then(()=>{
      });
    }
  }

  async findFoods(name) {
    this.loading = true;
    let result = await this.post.getFood(name, 0);
    if (result.success) {
      this.foods = result.result;
      this.loading = false;
    }
  }

  async findPeople(name) {
    this.loading = true;
    let result = await this.post.getPeople(name, 0, 4);
    if (result.success) {
      this.users = result.result;
      this.loading = false;
    }
  }
  async doInfinite(infiniteScroll) {
    let result;
    result = await this.post.getFood(this.searched, this.foods.length);
      if (result && result.result.length > 0)
        result.result.forEach(item => this.foods.push(item));
  
      if (result.result.length == 0) {
        this.showToast("Não foram encontrados mais resultados", "top");
      }
      infiniteScroll.complete();
  }
  async onInput(event) {
    let name = event;
    this.showSad = false;
    this.searched = name;
    if (name && !this.showSad) {
      this.showWelcome = 0;
      await this.findFoods(name);
      // await this.findPeople(name);
      this.showSad = this.foods.length == 0 && this.users.length == 0;
    } else {
      this.showWelcome = 1;
    }
  }

  // pushSearchResultPage(typeOfResult: string) {
  //   let searched = this.searched;
  //   let firstLoaded = [];

  //   // if (typeOfResult == "food") {
  //   //   firstLoaded = this.foods;
  //   //   this.old = [];
  //   //   firstLoaded.forEach(item=>this.old.push(item))
  //   //   this.lastType = typeOfResult;
  //   // } else {
  //   //   firstLoaded = this.users;
  //   //   this.old = [];
  //   //   firstLoaded.forEach(item=>this.old.push(item))
  //   //   this.lastType = typeOfResult;
  //   // }
  //   this.navCtrl.push(SearchResultPage, {
  //     searched,
  //     typeOfResult
  //   });
  // }

  showToast(message: string, position: string) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: false,
      duration: 2500,
      position: position
    });

    toast.present(toast);
  }

  openFoodInfo(food) {
    if (this.type == "montarPrato"){
      this.navCtrl.push("OpcoesAlimentoPage", {
        food,
        refeicao: this.refeicao,
        callback: this.myCallbackFunction
      })
    } else
      this.navCtrl.push('InfoAlimentoPage', { food });
  }

  myCallbackFunction = _params => {
    return new Promise((resolve, reject) => {
      this.selectedFoodPrato = _params;
      this.navCtrl.pop();
      resolve();
    });
  };

  // toggleViewMode() {
  //   if (this.viewMode == this.maxViewMode) this.viewMode = 0;
  //   else this.viewMode = this.viewMode + 1;
  // }
}
