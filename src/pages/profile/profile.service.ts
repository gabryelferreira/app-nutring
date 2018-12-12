import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavController } from "ionic-angular";

@Injectable()
export class ProfileGetService extends Connect {
  constructor(private _http: HttpClient, private _navCtrl: NavController) {
    super(_http, "get", _navCtrl);
  }
}

@Injectable()
export class ProfilePostService extends Connect {
  constructor(private _http: HttpClient, private _navCtrl: NavController) {
    super(_http, "post", _navCtrl);
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
