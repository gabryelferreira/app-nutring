import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PostPictureGetService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "get");
  }
}

@Injectable()
export class PostPicturePostService extends Connect {
  constructor(private _http: HttpClient) {
    super(_http, "post");
  }

  postPicture(id, img, descricao) {
    return this.callMethod("postPicture", { id, img, descricao });
  }
}
