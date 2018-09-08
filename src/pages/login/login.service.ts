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

    login(email: string, senha: string){
        return this.callMethod("login", {email, senha});
    }

    register(user: any){
        return this.callMethod("register", user);
    }

    connectWithFacebook(facebookUser) {
        return this.callMethod('fbLogin', facebookUser)
    }

}