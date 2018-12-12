import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavController } from "ionic-angular";

@Injectable()
export class EstatisticasGetService extends Connect {
    constructor(private _http: HttpClient, private _navCtrl: NavController) {
        super(_http, "get", _navCtrl);
    }

    getKcalConsumidaNoDia(id_usuario: number, dt_consumo: string){
        return this.callMethod("getKcalConsumidaNoDia", { id_usuario, dt_consumo });
    }

    getTudoConsumidoNoDia(id_usuario: number, dt_consumo: string){
        return this.callMethod("getTudoConsumidoNoDia", { id_usuario, dt_consumo });
    }

}

@Injectable()
export class EstatisticasPostService extends Connect {
    constructor(private _http: HttpClient, private _navCtrl: NavController) {
        super(_http, "post", _navCtrl);
    }

    reloadUserInfo(id_usuario:number){
        return this.callMethod("reloadUserInfo", { id_usuario })
    }

    getMonthsOfPratos(id_usuario: number){
        return this.callMethod("getMonthsOfPratos", { id_usuario });
    }

    getUserDailyKcal(id_usuario: number){
        return this.callMethod("getUserDailyKcal", { id_usuario });
    }

}
