import { Connect } from '../../app/connect';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';

@Injectable()
export class RegisterGetService extends Connect {
    constructor(private _http: HttpClient, private _navCtrl: NavController) {
        super(_http, "get", _navCtrl);
    }
}

@Injectable()
export class RegisterPostService extends Connect {
    constructor(private _http: HttpClient, private _navCtrl: NavController) {
        super(_http, "post", _navCtrl);
    }

    register(user: any){
        return this.callMethod("register", {user});
    }

}