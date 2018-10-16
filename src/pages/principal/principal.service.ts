import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PrincipalGetService extends Connect {
    constructor(private _http: HttpClient) {
        super(_http, "get");
    }
}

@Injectable()
export class PrincipalPostService extends Connect {
    constructor(private _http: HttpClient) {
        super(_http, "post");
    }

    postPicture(id, img, descricao) {
        return this.callMethod("postPicture", { id, img, descricao });
    }

    getRefeicoesPadroes(){
        return this.callMethod("getRefeicoesPadroes");
    }

    getRefeicoesCustom(id_usuario: number){
        return this.callMethod("getRefeicoesCustom", { id_usuario });
    }

    createRefeicaoCustom(id_usuario: number, refeicao: string, foto?: any){
        if (foto){
            return this.callMethod("createRefeicaoCustom", { id_usuario, refeicao, foto });
        } else {
            return this.callMethod("createRefeicaoCustom", { id_usuario, refeicao });
        }
    }
    
    reloadUserInfo(id_usuario:number){
        return this.callMethod("reloadUserInfo", { id_usuario })
    }

}
