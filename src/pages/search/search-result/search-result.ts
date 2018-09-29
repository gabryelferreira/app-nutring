import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { SettingsService } from "../../settings/settings.service";
import * as service from "../search.service";

/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-search-result",
  templateUrl: "search-result.html",
  providers: [service.SearchGetService, service.SearchPostService]
})
export class SearchResultPage {
  selectedTheme: String = "";
  typeOfResult: string;
  searched: string;
  private searchResults = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private post: service.SearchPostService,
    private toastCtrl: ToastController,
    _settings: SettingsService
  ) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.typeOfResult = this.navParams.data.typeOfResult;
    this.searched = this.navParams.data.searched;
    this.searchResults = this.navParams.data.firstLoaded;
  }
  async ionViewWillEnter() {
    this.typeOfResult = this.navParams.data.typeOfResult;
    this.searched = this.navParams.data.searched;
    this.searchResults = this.navParams.data.firstLoaded;
    let result;

    if (this.typeOfResult == "food")
      result = await this.post.getFood(
        this.searched,
        this.searchResults.length
      );
    else
      result = await this.post.getPeople(
        this.searched,
        this.searchResults.length
      );
    if (result && result.result.length > 0)
      result.result.forEach(item => this.searchResults.push(item));
  }
  

  async doInfinite(infiniteScroll) {
    let result;

    if (this.typeOfResult == "food")
      result = await this.post.getFood(
        this.searched,
        this.searchResults.length
      );
    else
      result = await this.post.getPeople(
        this.searched,
        this.searchResults.length
      );
    if (result && result.result.length > 0)
      result.result.forEach(item => this.searchResults.push(item));

    infiniteScroll.complete();
    if (result.result.length == 0) {
      this.showToast("Não foram encontrados mais resultados", "top");
      infiniteScroll.complete();
    }
    infiniteScroll.complete();
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
}
