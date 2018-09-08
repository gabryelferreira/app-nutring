import { Connect } from '../../app/connect';
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


    createPrato(data: any){
        return this.callMethod("createPrato", {data});
    }

}