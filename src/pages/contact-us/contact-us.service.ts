import { Connect } from '../../app/connect';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';

@Injectable()
export class ContactUsGetService extends Connect {
    constructor(private _http: HttpClient, private _navCtrl: NavController) {
        super(_http, "get", _navCtrl);
    }
}

@Injectable()
export class ContactUsPostService extends Connect {
    constructor(private _http: HttpClient, private _navCtrl: NavController) {
        super(_http, "post", _navCtrl);
    }

    sendMessageToNutring(data: any){
        return this.callMethod("sendMessageToNutring", {data});
    }

    getUserMessages(id_usuario: number){
        return this.callMethod("getUserMessages", {id_usuario});
    }

}