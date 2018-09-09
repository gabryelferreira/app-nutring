import { Connect } from '../../app/connect';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileGetService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "get");
    }

}

@Injectable()
export class ProfilePostService extends Connect {
    constructor(private _http: HttpClient){
        super(_http, "post");
    }

    updateUserOptionalInfo(data: any){
        return this.callMethod("updateUserOptionalInfo", {data});
    }

    updateUserPersonalInfo(data: any){
        return this.callMethod("updateUserPersonalInfo")
    }

}