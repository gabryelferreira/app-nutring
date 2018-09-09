import { Connect } from '../../app/connect';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactUsGetService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "get");
    }
}

@Injectable()
export class ContactUsPostService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "post");
    }

    sendMessageToNutring(data: any){
        return this.callMethod("sendMessageToNutring", {data});
    }

    getUserMessages(id_usuario: number){
        return this.callMethod("getUserMessages", {id_usuario});
    }

}