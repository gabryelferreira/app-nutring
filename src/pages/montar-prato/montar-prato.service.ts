import { Connect } from '../../app/connect';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MontarPratoGetService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "get");
    }

    getFood(food: string){
        return this.callMethod("getFood?food_name=" + food);
    }

    findFoods(){
        return this.callMethod("findFoods");
    }

}

@Injectable()
export class MontarPratoPostService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "post");
    }
}