import { Connect } from './connect';
import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginGetService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "get", "http://localhost/nutring-api/api/");
    }

    findFoods(food: string){
        return this.callMethod("getFood?food_name=" + food);
    }

    getFood(food: string){
        return this.callMethod("getFood?food_name=" + food);
    }

}

@Injectable()
export class LoginPostService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "post", "http://localhost/nutring-api/api/");
    }

    login(loginData: any){
        return this.callMethod("login", loginData);
    }

    register(user: any){
        return this.callMethod("register", user);
    }

}