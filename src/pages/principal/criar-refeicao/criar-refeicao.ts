import { SettingsService } from './../../settings/settings.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PrincipalPostService } from '../principal.service';
import { IUser } from '../../../app/types';

/**
 * Generated class for the CriarRefeicaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-refeicao',
  templateUrl: 'criar-refeicao.html',
  providers:[PrincipalPostService]
})
export class CriarRefeicaoPage {

  callback;
  refeicao:string = "";
  loading:boolean = false;
  selectedTheme: String = "";
  picture:any = "/assets/imgs/food2.jpeg";
  actualPicture: any = "/assets/imgs/food2.jpeg";
  imageOptions: boolean = false;
  user:IUser;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private camera:Camera, private post:PrincipalPostService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.callback = this.navParams.get("callback")
  }

  ionViewWillLeave() {
    this.callback().then(()=>{
    });
  }

  async sendRefeicao(){
    let result;
    this.loading = true;
    var picture = this.picture;
    if (picture == this.actualPicture){
      picture = null;
    }
    result = await this.post.createRefeicaoCustom(this.user.id_usuario, this.refeicao, picture);
    if (result && result.success){
      this.navCtrl.pop();
    }
    this.loading = false;
  }

  openGaleria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    };
    this.camera.getPicture(options).then(
      imageData => {
        let img = "data:image/jpeg;base64," + imageData;
        this.picture = img;
        this.imageOptions = false; 
      },
      err => {
        // Handle error
      }
    );
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      imageData => {
        let img = "data:image/jpeg;base64," + imageData;
        this.picture = img;
        this.imageOptions = false;
      },
      err => {
        // Handle error
      }
    );
  }

}
