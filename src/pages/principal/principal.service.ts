import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavController } from "ionic-angular";

@Injectable()
export class PrincipalGetService extends Connect {
    constructor(private _http: HttpClient, private _navCtrl: NavController) {
        super(_http, "get", _navCtrl);
    }
}

@Injectable()
export class PrincipalPostService extends Connect {
    constructor(private _http: HttpClient, private _navCtrl: NavController) {
        super(_http, "post", _navCtrl);
    }

    postPicture(id, img, descricao) {
        return this.callMethod("postPicture", { id, img, descricao });
    }

    getRefeicoesPadroes(id_usuario: number){
        return this.callMethod("getRefeicoesPadroes", { id_usuario });
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

    updateRefeicaoCustom(id_usuario: number, id_refeicao_usuario: number, refeicao: string, foto?: any){
        if (foto){
            return this.callMethod("updateRefeicaoCustom", { id_usuario, id_refeicao_usuario, refeicao, foto });
        } else {
            return this.callMethod("updateRefeicaoCustom", { id_usuario, id_refeicao_usuario, refeicao });
        }
    }

    reloadUserInfo(id_usuario:number){
        return this.callMethod("reloadUserInfo", { id_usuario })
    }

}
