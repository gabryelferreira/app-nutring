import * as service from './search.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [service.SearchGetService, service.SearchPostService]
})
export class SearchPage {

  foods = [];
  foodsBackup = [];
  public searchInput = {
    shouldShowCancel: false,
    searchText: ""
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private get: service.SearchGetService, private post: service.SearchPostService) {
    this.findFoods();  
  }

  async findFoods(){
    let result = await this.get.findFoods();
    if (result.success){
      this.foods = result.result;
      this.foodsBackup = this.foods;
      console.log("foods = ", this.foods);
    }
  }

  onInput(event){
    var allFoods = this.foodsBackup;
    var text = this.searchInput.searchText;
    var filteredFoods = allFoods.filter(function(element, i){
      if (element.nome.toLowerCase().indexOf(text.toLowerCase()) != -1)
        return true
      return false
    });
    this.foods = filteredFoods;
  }

  onCancel(event){
    this.foods = this.foodsBackup;
  }

  ionViewDidLoad() {
  }

}
