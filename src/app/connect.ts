import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urlencode } from "./url";
import { NavController } from "ionic-angular";

export abstract class Connect {
  url: string = "http://nutring.com.br/api/";
  // url: string = "http://localhost/nutring-api/";

  headers = {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"};

  constructor(private http: HttpClient, private method: string, private navCtrl: NavController) {}

  protected async callMethod(_function: string, args?: { [id: string]: any }): Promise<any> {
    

    await this.setAuthorization();

    let options = {
      headers: new HttpHeaders(this.headers),
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
        result = await this.http.get(this.url + _function + "?" + body, options).toPromise().then();
        console.log("RESULT", result);
        let error = await this.treatError(result);
        if (error)
          await this.logoutUser();
        return result;
      } catch (err) {
        console.error(err);
        return "error";
      }
    } else if (this.method.toUpperCase() == "POST") {
      try {
        // console.log(body);
        result = await this.http.post(this.url + _function, body, options).toPromise().then();
        console.log("RESULT", result);
        let error = await this.treatError(result);
        if (error)
          await this.logoutUser();
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

  async setAuthorization(){
    let user = JSON.parse(localStorage.getItem("userData"));
    console.log("userAtual = ", user)
    if (user && user.token){
      this.headers["Authorization"] = user.token;
    } else {
      this.headers["Authorization"] = "";
    }
  }

  treatError(result: any){
    if (result && result.error){
      if (result.error == "NOT_AUTHORIZED"){
        return true;
      } else {
        return false;
      }
    }
  }

  logoutUser(){
    localStorage.clear();
    location.href = "/";
  }

}
