import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavController } from "ionic-angular";

@Injectable()
export class MeusPratosGetService extends Connect {
  constructor(private _http: HttpClient, private _navCtrl: NavController) {
    super(_http, "get", _navCtrl);
  }
}

@Injectable()
export class MeusPratosPostService extends Connect {
  constructor(private _http: HttpClient, private _navCtrl: NavController) {
    super(_http, "post", _navCtrl);
  }

  getPratosByIdUser(id_usuario: number) {
    return this.callMethod("getPratosByIdUser", { id_usuario });
  }

  getPratoInfoById(id_prato: number) {
    return this.callMethod("getPratoInfoById", { id_prato });
  }

  getMonthsOfPratos(id_usuario: number) {
    return this.callMethod("getMonthsOfPratos", { id_usuario });
  }

  getPratosByDate(id_usuario: number, date: any) {
    return this.callMethod("getPratosByDate", { id_usuario, date });
  }

  deletePrato(id_usuario: number, id_prato_feito: number, id_prato: number){
    return this.callMethod("deletePrato", { id_usuario, id_prato_feito, id_prato });
  }

  reloadUserInfo(id_usuario:number){
    return this.callMethod("reloadUserInfo", { id_usuario })
  }

  getNutritionalInfoByIdPrato(id_prato: number, id_usuario: number){
    return this.callMethod("getNutritionalInfoByIdPrato", { id_prato, id_usuario });
  }

}
