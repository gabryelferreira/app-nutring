import { Connect } from '../../app/connect';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegisterGetService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "get");
    }
}

@Injectable()
export class RegisterPostService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "post");
    }

    register(user: any){
        return this.callMethod("register", {user});
    }

}