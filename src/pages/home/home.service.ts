import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as types from "../../app/types";

@Injectable()
export class HomeGetService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "get");
  }
}

@Injectable()
export class HomePostService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "post");
  }

  getDailyKcal(id_usuario: number) {
    return this.callMethod("getUserDailyKcal", { id_usuario });
  }

  getFeed(id_usuario: number, offset: number = 0, limit: number = 10){
    return this.callMethod("getFeed", { id_usuario, offset, limit });
  }

  getCommentsByIdPost(id_post: number, id_usuario: number, offset: number, limit: number = 10){
    return this.callMethod("getCommentsByIdPost", { id_post, id_usuario, offset, limit });
  }

  likeUnlikePost(id_post: number, id_usuario: number){
    return this.callMethod("likeUnlikePost", { id_post, id_usuario });
  }

  commentPost(id_post: number, id_usuario: number, comentario: string){
    return this.callMethod("commentPost", { id_post, id_usuario, comentario });
  }

  likeUnlikeComment(id_comentario: number, id_usuario: number){
    return this.callMethod("likeUnlikeComment", { id_comentario, id_usuario });
  }

  deleteComments(comentarios: string){
    return this.callMethod("deleteComments", { comentarios });
  }

  getPostById(id_post: number, id_usuario: number){
    return this.callMethod("getPostById", { id_post, id_usuario })
  }

}
