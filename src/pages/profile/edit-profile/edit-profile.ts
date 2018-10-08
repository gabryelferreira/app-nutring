import { ProfilePostService } from './../profile.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SettingsService } from '../../settings/settings.service';
import { IUser } from '../../../app/types';
import { UpdateLoginInfoPage } from '../update-login-info/update-login-info';
import { Camera, CameraOptions } from "@ionic-native/camera";

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
  providers: [
    ProfilePostService
  ]
})
export class EditProfilePage {

  picture:any = '';
  selectedTheme: String = "";
  user:IUser = {
    altura_m:"", 
    cep:"",
    usuario:"",
    telefone:"",
    sobrenome:"",
    sexo:"",
    email:"",
    senha:"",
    dt_nasc:"",
    peso_kg:"",
    foto:"",
    nome:"",
    id_usuario:0
  };
  dt_nasc: string = "";
  page = "pessoais";

  loading: boolean = false;

  checkOptional = [{field: 'peso_kg', name: 'Peso', end: 'inválido'}, {field: 'altura_m', name: 'Altura', end: 'inválida'}];
  optionalData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              _settings: SettingsService, private post: ProfilePostService,
              private toastCtrl: ToastController, private camera:Camera) {
    this.user = navParams.get("user");
    this.user.peso_kg = this.user.peso_kg.match(/^-?\d+(?:\.\d{0,2})?/)[0]
    this.user.altura_m = this.user.altura_m.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  ionViewDidLoad() {
  }

  async ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.user.peso_kg = this.user.peso_kg.match(/^-?\d+(?:\.\d{0,2})?/)[0]
    this.user.altura_m = this.user.altura_m.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
  }

  async setOptionalInfo(){
      let field = this.optionalData["peso_kg"];
      if (field != null && field != "" && field != undefined){
        if (field.indexOf(',') != -1){
          this.optionalData["peso_kg"] = field.replace(',', '.');
        }
      }
      field = this.optionalData["altura_m"];
      if (field != null && field != "" && field != undefined){
        if (field.indexOf(',') != -1){
          this.optionalData["altura_m"] = field.replace(',', '.');
        }
      }

    let altura = parseFloat(this.optionalData["altura_m"]);
    let peso = parseFloat(this.optionalData["peso_kg"]);
    this.user.altura_m = altura.toString();
    this.user.peso_kg = peso.toString();
  }

  async updateUserInfo(){
    if (this.validPersonalFields() && this.validFields()){
      this.loading = true;
      this.setOptionalInfo();
      let result 
      if (this.picture != '')
        result = await this.post.updateUserAvatar(this.user.id_usuario, this.picture);
      result = await this.post.updateUserInfo(JSON.stringify(this.user));
      if (result.success){
        localStorage.setItem("userData", JSON.stringify(result.result))
        this.navCtrl.pop();
      } else {
        this.showToast("Ocorreu um erro! Tente novamente.", "top");
      }
      this.loading = false;
    }
  }

  validFields(){
    let regexp = /^\d*\.?\d*\,?\d*$/;
    
    for (var i = 0; i < this.checkOptional.length; i++){
      let field = this.user[this.checkOptional[i].field];
      if (!regexp.test(field) && field != null && field != undefined && field != ""){
        let message = this.checkOptional[i].name + " " + this.checkOptional[i].end;
        this.showToast(message, "top");
        return false;
      }
      this.optionalData[this.checkOptional[i].field] = this.user[this.checkOptional[i].field];
    }
    return true;
  }

  validPersonalFields(){
    return this.user["nome"] != null && this.user["nome"] != "" && this.user["nome"].length > 0;
  }

  showToast(message: string, position: string) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: false,
      duration: 2500,
      position: position
    });

    toast.present(toast);
  }

  validNumericField(field){
    if (field && field.length > 5)
      return false;
    field = (0+field).replace(/^-?\d+(?:\.\d{0,2})?/)[0]
      
  }

  openUpdateLoginInfo(){
    this.navCtrl.push(UpdateLoginInfoPage);
  }

  openGaleria() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
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

  transformDtNasc(e: any){
    var allowedKeys = [8, 13, 16, 17, 37, 39, 46] 

    if (allowedKeys.indexOf(e.keyCode) == -1){
        var replace = true;
        while (replace == true){
            if (this.dt_nasc.indexOf('/') != -1)
              this.dt_nasc = this.dt_nasc.replace('/', '')
            else
                replace = false;
        }
        if (this.dt_nasc.length <= 2)
          this.dt_nasc = this.dt_nasc.replace(/(\d{2})/g,"\$1/")
        else if (this.dt_nasc.length <= 3)
            this.dt_nasc = this.dt_nasc.replace(/(\d{2})(\d{1})/g,"\$1/\$2")
        else if (this.dt_nasc.length <= 4)
            this.dt_nasc = this.dt_nasc.replace(/(\d{2})(\d{2})/g,"\$1/\$2/")
        else if (this.dt_nasc.length <= 5)
            this.dt_nasc = this.dt_nasc.replace(/(\d{2})(\d{2})(\d{1})/g,"\$1/\$2/\$3")
        else if (this.dt_nasc.length <= 6)
            this.dt_nasc = this.dt_nasc.replace(/(\d{2})(\d{2})(\d{2})/g,"\$1/\$2/\$3")
        else if (this.dt_nasc.length <= 7)
            this.dt_nasc = this.dt_nasc.replace(/(\d{2})(\d{2})(\d{3})/g,"\$1/\$2/\$3")
        else if (this.dt_nasc.length <= 8)
            this.dt_nasc = this.dt_nasc.replace(/(\d{2})(\d{2})(\d{4})/g,"\$1/\$2/\$3")
    } 
  }

  validateKeyDtNasc(e: any){
      var allowed = "0123456789";
      if (allowed.indexOf(e.key) != -1)
          return true;
      return false;
  };

  validateDtNasc(){
    var date = null;
    var fullDate = this.dt_nasc;
    var length = fullDate.length;
    var count = 0;
    for (var i = 0; i < fullDate.length; i++){
        if (fullDate[i] == "/")
            count++;
    }
    if (count == 2 && length == 10){
        var replace = true;
        while (replace == true){
            if (fullDate.indexOf("/") != -1){
                fullDate = fullDate.replace("/", "");
            } else {
                replace = false;
            }
        }
        var day = fullDate.substring(0, 2);
        var month = fullDate.substring(2, 4);
        var year = fullDate.substring(4, 8);
        date = new Date(year + "-" + month  + "-" + day);
    }
    return date != null && date != undefined && date != "Invalid Date"
  }

}
