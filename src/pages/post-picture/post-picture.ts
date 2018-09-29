import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { IUser } from "../../app/types";
import { PostPicturePostService } from "./post-picture.service";

/**
 * Generated class for the PostPicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-post-picture",
  templateUrl: "post-picture.html",
  providers:[PostPicturePostService]
})
export class PostPicturePage {
  picture: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private post: PostPicturePostService
  ) {}

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      imageData => {
        let img = "data:image/jpeg;base64," + imageData;
        this.picture = img;
      },
      err => {
        // Handle error
      }
    );
  }

  async postPicture() {
    let user: IUser = JSON.parse(localStorage.getItem("userData"));
    let data = JSON.stringify({ id_usuario: user.id_usuario, img: this.picture});
    let result = await this.post.postPicture(data);
    console.log("result =",result);
  }

  //seta Para img padrão
  ionViewWillEnter() {
    this.picture =
      "data:image/png;base64,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";
      this.openCamera();
  }
}
