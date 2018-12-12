import { Connect } from "../../app/connect";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NavController } from "ionic-angular";

@Injectable()
export class PostPictureGetService extends Connect {
  constructor(private _http: HttpClient, private _navCtrl: NavController) {
    super(_http, "get", _navCtrl);
  }
}

@Injectable()
export class PostPicturePostService extends Connect {
  constructor(private _http: HttpClient, private _navCtrl: NavController) {
    super(_http, "post", _navCtrl);
  }

  postPicture(id, img, descricao) {
    return this.callMethod("postPicture", { id, img, descricao });
  }
}
