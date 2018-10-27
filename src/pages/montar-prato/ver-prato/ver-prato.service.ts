import { Connect } from '../../../app/connect';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VerPratoGetService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "get");
    }

}

@Injectable()
export class VerPratoPostService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "post");
    }


    createPrato(data: any, refeicao:any, type:string){
        return this.callMethod("createPrato", {data, refeicao, type});
    }

    reloadUserInfo(id_usuario:number){
        return this.callMethod("reloadUserInfo", { id_usuario })
    }

    updatePrato(data: any, refeicao: any, type: string){
        return this.callMethod("updatePrato", {data, refeicao, type});
    }

}