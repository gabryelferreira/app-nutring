import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ProfileGetService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "get");
  }
}

@Injectable()
export class ProfilePostService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "post");
  }

  getRefeicoesCustom(id_usuario: number){
    return this.callMethod("getRefeicoesCustom", { id_usuario });
  }

  updateUserInfo(data: any) {
    return this.callMethod("updateUserInfo", { data });
  }

  updateUserAvatar(id:number,img:any){
    return this.callMethod("updateUserAvatar", {id, img})
  }
  getUserPosts(id: number, limit:number, offset:number) {
    return this.callMethod("getUserPosts", { id, limit, offset });
  }

  likeUnlikePost(id_post: number, id_usuario: number){
    return this.callMethod("likeUnlikePost", { id_post, id_usuario });
  }


}
