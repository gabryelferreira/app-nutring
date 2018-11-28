import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class EditarObjetivoGetService extends Connect {
    constructor(private _http: HttpClient) {
        super(_http, "get");
    }

}

@Injectable()
export class EditarObjetivoPostService extends Connect {
    constructor(private _http: HttpClient) {
        super(_http, "post");
    }

    salvarObjetivo(id_usuario:number, cd_objetivo: string, vl_objetivo_kg: string){
        return this.callMethod("salvarObjetivo", { id_usuario, cd_objetivo, vl_objetivo_kg });
    }

    atualizarAlturaPeso(id_usuario: number, altura_m: string, peso_kg: string){
        return this.callMethod("atualizarAlturaPeso", { id_usuario, altura_m, peso_kg });
    }

}
