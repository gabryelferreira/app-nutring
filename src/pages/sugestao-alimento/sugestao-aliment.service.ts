import { Connect } from '../../app/connect';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SugestaoGetService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "get");
    }
}

@Injectable()
export class SugestaoPostService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "post");
    }

    addSugestaoDeAlimento(sugestaoDeAlimento: any){
        return this.callMethod("addSugestaoDeAlimento", {sugestaoDeAlimento});
    }

    getUserSuggestions(id_usuario: number){
        return this.callMethod("getUserSuggestions", {id_usuario});
    }

}