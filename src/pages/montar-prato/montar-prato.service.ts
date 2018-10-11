import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MontarPratoGetService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "get");
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
  constructor(private _http: HttpClient) {
    super(_http, "post");
  }

  findFoods(offset: number = 0, limit: number = 10) {
    return this.callMethod("findFoods", { offset, limit });
  }

  getFood(food: string, offset: number = 0, limit:number = 10) {
    return this.callMethod("getFood", { food, offset, limit });
  }
}
