import { VerPratoPage } from "./ver-prato/ver-prato";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ModalController
} from "ionic-angular";
import { SettingsService } from "../settings/settings.service";
import * as service from "./montar-prato.service";
import * as types from "../../app/types";
import { ScrollHideConfig } from "../../components/hide-on-scrolling/scroll-hide-directive";
/**
 * Generated class for the MontarPratoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-montar-prato",
  templateUrl: "montar-prato.html",
  providers: [service.MontarPratoGetService, service.MontarPratoPostService]
})
export class MontarPratoPage {
  headerScrollConfig: ScrollHideConfig = {
    cssProperty: "margin-top",
    maxValue: 46
  };
  refeicao: any = {};
  type: string;
  selectedTheme: String = "";
  loading: boolean = false;

  isSearching: boolean = false;

  foods = [];
  foodsBackup = [];
  foodsFiltered = [];

  selectedFood: number = -1;
  searchText: string = "";
  allSelectedFoods = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private get: service.MontarPratoGetService,
    private post: service.MontarPratoPostService,
    private toastCtrl: ToastController,
    private settings: SettingsService,
    public modalCtrl: ModalController
  ) {
    settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.findFoods();
  }

  async findFoods() {
    this.loading = true;
    let result = await this.post.findFoods();
    if (result.success) {
      this.foods = result.result;
    }
    this.loading = false;
  }

  backButtonVisibility() {
    setTimeout(() => { this.isSearching = !this.isSearching }, 50);
  }
  async onInput(event) {
    let text = event;
    this.searchText = text;
    if (text == undefined) text = "";
    let result = await this.post.getFood(text);
    if (result.success) {
      var foods = result.result;
      if (this.allSelectedFoods.length > 0) {
        for (var x = 0; x < foods.length; x++) {
          for (var y = 0; y < this.allSelectedFoods.length; y++) {
            if (foods[x].id_alimento == this.allSelectedFoods[y].id_alimento) {
              foods[x] = this.allSelectedFoods[y];
            }
          }
        }
      }
      this.foods = foods;
    }
  }

  async doInfinite(infiniteScroll) {
    let result;
    if (this.isSearching)
      result = await this.post.getFood(this.searchText, this.foods.length, 10);
    else result = await this.post.findFoods(this.foods.length);

    if (result && result.result.length > 0)
      result.result.forEach(item => this.foods.push(item));

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

  selectFood(food: any) {
    food["selected"] = !food["selected"];
  }

  ionViewDidLoad() {}

  ionViewWillEnter() {
    this.refeicao = this.navParams.get("refeicao");
    this.type = this.navParams.get("type");
  }

  mudarPorcao(porcao: number, food: any) {
    let foodInPlate = false;
    this.allSelectedFoods.forEach((element, index) => {
      if (element.id_alimento == food.id_alimento) {
        foodInPlate = true;
        if (porcao == 0) {
          this.allSelectedFoods.splice(index, 1);
        }
        return;
      }
    });
    if (!foodInPlate) if (porcao > 0) this.allSelectedFoods.push(food);
  }

  myCallbackFunction = _params => {
    return new Promise((resolve, reject) => {
      this.allSelectedFoods = _params;
      resolve();
    });
  };

  verPrato() {
    this.foods.forEach(element => {
      element.selected = false;
    });
    this.allSelectedFoods.forEach(element => {
      element.selected = false;
    });
    this.navCtrl.push(VerPratoPage, {
      callback: this.myCallbackFunction,
      allSelectedFoods: this.allSelectedFoods,
      refeicao: this.refeicao,
      type: this.type
    });
  }
}
