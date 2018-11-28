import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class EstatisticasGetService extends Connect {
    constructor(private _http: HttpClient) {
        super(_http, "get");
    }

    getKcalConsumidaNoDia(id_usuario: number, dt_consumo: string){
        return this.callMethod("getKcalConsumidaNoDia?id_usuario=" + id_usuario + "&dt_consumo=" + dt_consumo);
    }

    getTudoConsumidoNoDia(id_usuario: number, dt_consumo: string){
        return this.callMethod("getTudoConsumidoNoDia?id_usuario=" + id_usuario + "&dt_consumo=" + dt_consumo);
    }

}

@Injectable()
export class EstatisticasPostService extends Connect {
    constructor(private _http: HttpClient) {
        super(_http, "post");
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
