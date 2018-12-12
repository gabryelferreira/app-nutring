import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavController } from "ionic-angular";

@Injectable()
export class MontarPratoGetService extends Connect {
  constructor(private _http: HttpClient, private _navCtrl: NavController) {
    super(_http, "get", _navCtrl);
  }

  getFood(food: string) {
    return this.callMethod("getFood?food_name=" + food);
  }

  findFoods() {
    return this.callMethod("findFoods");
  }
}

@Injectable()
export class MontarPratoPostService extends Connect {
  constructor(private _http: HttpClient, private _navCtrl: NavController) {
    super(_http, "post", _navCtrl);
  }

  findFoods(offset: number = 0, limit: number = 15) {
    return this.callMethod("findFoods", { offset, limit });
  }

  getFood(food: string, offset: number = 0, limit:number = 15) {
    return this.callMethod("getFood", { food, offset, limit });
  }
}
