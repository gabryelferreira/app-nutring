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
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html",
  providers: [service.SearchGetService, service.SearchPostService]
})
export class SearchPage {
  //merda
  headerScrollConfig: ScrollHideConfig = {
    cssProperty: "margin-top",
    maxValue: 44
  };

  foods = [];
  foodsBackup = [];
  foodsFiltered = [];

  public searchInput = {
    shouldShowCancel: false,
    searchText: ""
  };

  offset: number = 0;
  viewMode: number = 0;
  maxViewMode: number = 1;
  selectedTheme: String = "";
  loading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private get: service.SearchGetService,
    private post: service.SearchPostService,
    private toastCtrl: ToastController,
    private _settings: SettingsService
  ) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.findFoods();
  }

  getMaxViewMode() {
    return this.maxViewMode;
  }

  setViewMode(viewMode: number) {
    this.viewMode = viewMode;
  }
  getViewMode() {
    return this.viewMode;
  }

  setInitialOffset() {
    this.offset = this.getDefaultOffset();
  }
  setOffset(offset: number) {
    this.offset = offset;
  }
  getOffset() {
    return this.offset;
  }
  getDefaultOffset() {
    return 10;
  }
  increaseOffset() {
    this.offset = this.offset + this.getDefaultOffset();
  }

  setFoods(foods: any[]) {
    this.foods = foods;
  }
  getFoods() {
    return this.foods;
  }
  setInitialFoods() {
    var foods = [];
    for (let i = 0; i < this.getDefaultOffset(); i++) {
      foods.push(this.getFoodsBackupByIndex(i));
    }
    this.setFoods(foods);
  }

  setFoodsBackup(foodsBackup: any[]) {
    this.foodsBackup = foodsBackup;
  }
  getFoodsBackup() {
    return this.foodsBackup;
  }
  getFoodsBackupByIndex(index: number) {
    return this.foodsBackup[index];
  }

  setFoodsFiltered(foodsFiltered: any[]) {
    this.foodsFiltered = foodsFiltered;
  }
  getFoodsFiltered() {
    return this.foodsFiltered;
  }
  getFoodsFilteredByIndex(index: number) {
    return this.foodsFiltered[index];
  }

  async findFoods() {
    if (localStorage.getItem("allFoods")) {
      let allFoods = JSON.parse(localStorage.getItem("allFoods"));
      this.setFoodsBackup(allFoods);
      this.setFoodsFiltered(allFoods);
      this.setInitialFoods();
      this.setInitialOffset();
    } else {
      this.loading = true;
      let result = await this.get.findFoods();
      if (result.success) {
        let allFoods = result.result;
        this.setFoodsBackup(allFoods);
        this.setFoodsFiltered(allFoods);
        this.setInitialFoods();
        this.setInitialOffset();
        localStorage.setItem("allFoods", JSON.stringify(this.getFoodsBackup()));
      }
      this.loading = false;
    }
  }

  hideScroll(ev: any) {
    console.log("to auqiii", ev);
  }

  onInput(event) {
    let allFoods = this.getFoodsBackup();
    let text = event;
    let foodsFiltered = allFoods.filter(function(element, i) {
      if (
        element.nome.toLowerCase().indexOf(text.toLowerCase()) != -1 ||
        parseFloat(element.kcal)
          .toFixed(2)
          .toString()
          .indexOf(text.toLowerCase()) != -1
      )
        return true;
      return false;
    });
    this.setFoodsFiltered(foodsFiltered);
    let foods = [];
    this.setOffset(0);
    let size = 0;
    if (this.getFoodsFiltered().length >= 10) size = this.getDefaultOffset();
    else size = this.getFoodsFiltered().length;

    for (let i = 0; i < size; i++) {
      foods.push(this.getFoodsFilteredByIndex(i));
    }
    this.setFoods(foods);
    this.increaseOffset();
  }

  onCancel(event) {
    this.setOffset(0);
    this.setInitialFoods();
    this.setFoodsFiltered(this.getFoodsBackup());
  }

  doInfinite(infiniteScroll) {
    if (this.getFoods().length < this.getFoodsFiltered().length) {
      let foods = this.getFoods();
      setTimeout(() => {
        var size = 0;
        if (
          this.getFoodsFiltered().length >
          this.getOffset() + this.getDefaultOffset()
        )
          size = this.getOffset() + this.getDefaultOffset();
        else size = this.getFoodsFiltered().length;
        for (let i = this.getOffset(); i < size; i++) {
          foods.push(this.getFoodsFilteredByIndex(i));
        }
        this.setFoods(foods);
        this.increaseOffset();
        infiniteScroll.complete();
      }, 500);
    } else {
      setTimeout(() => {
        this.showToast("Não foram encontrados mais alimentos", "top");
        infiniteScroll.complete();
      }, 500);
    }
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
    if (this.getViewMode() == this.getMaxViewMode()) this.setViewMode(0);
    else this.setViewMode(this.getViewMode() + 1);
  }

  ionViewDidLoad() {}
}
