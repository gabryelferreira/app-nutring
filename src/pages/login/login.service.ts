import { Connect } from '../../app/connect';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginGetService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "get");
    }
}

@Injectable()
export class LoginPostService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "post");
    }

    login(loginData: any){
        return this.callMethod("login", loginData);
    }

    register(user: any){
        return this.callMethod("register", user);
    }

}