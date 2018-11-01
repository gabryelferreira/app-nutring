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
  picture:any = "https://images.pexels.com/photos/920570/pexels-photo-920570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  actualPicture: any = "https://images.pexels.com/photos/920570/pexels-photo-920570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  imageOptions: boolean = false;
  user:IUser;
  type: string = "";
  selectedRefeicao: any;
  refeicaoCallback: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private camera:Camera, private post:PrincipalPostService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.callback = this.navParams.get("callback");
    this.type = this.navParams.get("type");
    if (this.type == "edit"){
      this.selectedRefeicao = this.navParams.get("refeicao");
      this.refeicao = this.selectedRefeicao.ds_refeicao;
      if (this.selectedRefeicao.foto)
        this.picture == this.selectedRefeicao.foto;
    }
  }

  ionViewWillLeave() {
    if (this.callback){
      if (this.type == "edit"){
        this.callback(this.refeicaoCallback).then(()=>{
        });
      } else {
        this.callback().then(()=>{
        });
      }
    }
  }

  async sendRefeicao(){
    let result;
    this.loading = true;
    var picture = this.picture;
    if (picture == this.actualPicture){
      picture = null;
    }
    if (this.type == "edit"){
      result = await this.post.updateRefeicaoCustom(this.user.id_usuario, this.selectedRefeicao.id_refeicao_usuario, this.refeicao, picture);
    } else {
      result = await this.post.createRefeicaoCustom(this.user.id_usuario, this.refeicao, picture);
    }
    if (result && result.success){
      if (this.type == "edit" && this.selectedRefeicao)
        this.refeicaoCallback = {
                                  id_refeicao_usuario: this.selectedRefeicao.id_refeicao_usuario, 
                                  ds_refeicao: this.refeicao, 
                                  foto: picture, 
                                  quantidade_pratos: this.selectedRefeicao.quantidade_pratos
                                }
      this.navCtrl.pop();
    }
    this.loading = false;
  }

  openGaleria() {
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false,
      targetWidth: 600,
      correctOrientation: true
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
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 600,
      correctOrientation: true
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
