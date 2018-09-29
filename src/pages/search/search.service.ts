import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SearchGetService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "get");
  }

  findFoods() {
    return this.callMethod("findFoods");
  }
}

@Injectable()
export class SearchPostService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "post");
  }

  getFood(food: string, offset: number = 0) {
    return this.callMethod("getFood", { food, offset });
  }

  getPeople(name: string, offset: number = 0) {
    return this.callMethod("getPeople", { name, offset });
  }
}
