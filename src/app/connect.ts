import { Config } from "./config";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { urlencode } from "./url";

export abstract class Connect {
  url: string = "http://localhost/nutring-api/api/";
  constructor(private http: HttpClient, private method: string) {}

  protected async callMethod(
    _function: string,
    args?: { [id: string]: any }
  ): Promise<any> {
    let options = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }),
      withCredentials: false,
      observe: null
    };
    let data = [];
    let result;
    for (let i in args) {
      data[i] = args[i];
    }
    let body = urlencode(data);
    if (this.method.toUpperCase() == "GET") {
      try {
        result = await this.http
          .get(this.url + _function, options)
          .toPromise()
          .then();
        console.log(result);
        return result;
      } catch (err) {
        console.error(err);
        return "error";
      }
    } else if (this.method.toUpperCase() == "POST") {
      try {
        console.log(body);
        result = await this.http
          .post(this.url + _function, body, options)
          .toPromise()
          .then();
        console.log(result);
        return result;
      } catch (err) {
        console.error(err);
        return "error";
      }
    } else {
      console.error("invalid method!");
      return "error";
    }
  }
}
