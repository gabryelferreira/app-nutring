import { SettingsService } from './../settings/settings.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VerPratoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-prato',
  templateUrl: 'ver-prato.html',
})
export class VerPratoPage {

  selectedTheme: String = "";
  foods = [];
  callback;

  foodsReturn = [];
  foodsFiltered = [];

  public searchInput = {
    shouldShowCancel: false,
    searchText: ""
  }
  
  offset: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private settings: SettingsService) {
    settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  ionViewWillEnter() {
    this.callback = this.navParams.get("callback")
    this.foods = this.navParams.get("allSelectedFoods")
    this.foodsReturn = this.foods;
    this.foodsFiltered = this.foods;
  }

  ionViewWillLeave() {
    this.callback(this.foodsReturn).then(()=>{      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerPratoPage');
  }

  selectFood(food: any){
    food["selected"] = !food["selected"];
  }

  mudarPorcao(porcao: number, food: any){
    this.foods.forEach((element, index) => {
      if (element.id_alimento == food.id_alimento){
        if (porcao == 0){
          element.selected = false;
          this.foods.splice(index, 1);
        }
        return;
      }
    });
  }

}
