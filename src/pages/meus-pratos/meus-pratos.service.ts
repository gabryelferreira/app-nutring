import { Connect } from '../../app/connect';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MeusPratosGetService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "get");
    }

}

@Injectable()
export class MeusPratosPostService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "post");
    }

    getPratosByIdUser(id_usuario: number){
        return this.callMethod("getPratosByIdUser", {id_usuario});
    }

    getPratoInfoById(id_prato: number){
        return this.callMethod("getPratoInfoById", {id_prato});
    }

}