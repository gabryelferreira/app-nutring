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

  showPeople: boolean = true;
  showFood: boolean = true;
  lastType: string = "";
  showWelcome: number = 1;
  viewMode: number = 0;
  maxViewMode: number = 1;
  selectedTheme: String = "";
  searched: string = "";
  loading: boolean = false;
  showSad: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private post: service.SearchPostService,
    private toastCtrl: ToastController,
    _settings: SettingsService
  ) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
  }

  ionViewWillEnter() {
    if (this.lastType == "food") {
      this.foods = this.old;
    } else if (this.lastType == "people") {
      this.users = this.old;
    }
  }
  async findFoods(name) {
    this.loading = true;
    let result = await this.post.getFood(name, 0, 4);
    if (result.success) {
      this.foods = result.result;
      console.log(this.foods);
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

  async onInput(event) {
    let name = event;
    this.showSad = false;
    this.searched = name;
    if (name == "") {
      this.showFood = true;
      this.showPeople = true;
    }
    console.log("search", this.searched);
    if (name && !this.showSad) {
      this.showWelcome = 0;
      await this.findFoods(name);
      await this.findPeople(name);
      this.showSad = this.foods.length == 0 && this.users.length == 0;
    } else {
      this.showWelcome = 1;
    }
  }

  pushSearchResultPage(typeOfResult: string) {
    let searched = this.searched;
    let firstLoaded = [];

    if (typeOfResult == "food") {
      firstLoaded = this.foods;
      this.old = [];
      firstLoaded.forEach(item=>this.old.push(item))
      this.lastType = typeOfResult;
    } else {
      firstLoaded = this.users;
      this.old = [];
      firstLoaded.forEach(item=>this.old.push(item))
      this.lastType = typeOfResult;
    }
    this.navCtrl.push(SearchResultPage, {
      searched,
      typeOfResult,
      firstLoaded
    });
  }

  showToast(message: string, position: string) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: false,
      duration: 2500,
      position: position
    });

    toast.present(toast);
  }

  toggleViewMode() {
    if (this.viewMode == this.maxViewMode) this.viewMode = 0;
    else this.viewMode = this.viewMode + 1;
  }
}
