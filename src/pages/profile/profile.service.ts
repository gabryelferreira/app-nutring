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

  updateUserOptionalInfo(data: any) {
    return this.callMethod("updateUserOptionalInfo", { data })
  }

  updateUserPersonalInfo(data: any) {
    return this.callMethod("updateUserPersonalInfo", { data })
  }

  updateUserInfo(data: any) {
    return this.callMethod("updateUserInfo", { data });
  }

  getUserPosts(id: number, limit:number, offset:number) {
    return this.callMethod("getUserPosts", { id, limit, offset });
  }

  likeUnlikePost(id_post: number, id_usuario: number){
    return this.callMethod("likeUnlikePost", { id_post, id_usuario });
  }
}
