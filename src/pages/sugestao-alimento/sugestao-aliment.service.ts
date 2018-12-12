import { Connect } from '../../app/connect';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';

@Injectable()
export class SugestaoGetService extends Connect {
    constructor(private _http: HttpClient, private _navCtrl: NavController) {
        super(_http, "get", _navCtrl);
    }
}

@Injectable()
export class SugestaoPostService extends Connect {
    constructor(private _http: HttpClient, private _navCtrl: NavController) {
        super(_http, "post", _navCtrl);
    }

    addSugestaoDeAlimento(sugestaoDeAlimento: any){
        return this.callMethod("addSugestaoDeAlimento", {sugestaoDeAlimento});
    }

    getUserSuggestions(id_usuario: number){
        return this.callMethod("getUserSuggestions", {id_usuario});
    }

}