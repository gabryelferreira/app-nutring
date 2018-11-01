import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as types from "../../app/types";

@Injectable()
export class EditRefeicoesGetService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "get");
  }
}

@Injectable()
export class EditRefeicoesPostService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "post");
  }

  deletarRefeicaoCustom(id_usuario: number, id_refeicao_usuario: number){
      return this.callMethod("deletarRefeicaoCustom", { id_usuario, id_refeicao_usuario });
  }

  getRefeicoesCustom(id_usuario){
    return this.callMethod("getRefeicoesCustom", { id_usuario });
  }

}
