import { HttpClient } from '@angular/common/http';

export abstract class Connect {

    constructor(private http: HttpClient, private method: string, private url: string){
    }

    protected async callMethod(_function: string, params?: any): Promise<any> {
        if (this.method.toUpperCase() == "GET"){
            try {
                var result = await this.http.get(this.url + _function).toPromise().then();
                return result;
            } catch (err){
                console.error(err);
                return "error";
            }
            
        } else if (this.method.toUpperCase() == "POST"){
            try {
                var result = await this.http.post(this.url + _function, params).toPromise().then();
                return result;
            } catch (err){
                console.error(err);
                return "error";
            }
        } else {
            console.error("invalid method!");
            return "error";
        }
    }

}