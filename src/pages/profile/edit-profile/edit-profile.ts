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

  backup_peso;
  backup_altura;
  backupSelecionado;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              _settings: SettingsService, private post: ProfilePostService,
              private toastCtrl: ToastController, private camera:Camera) {
    this.user = navParams.get("user");
    // if (this.user.peso_kg){
    //   // this.user.peso_kg = this.user.peso_kg.match(/^-?\d+(?:\.\d{0,2})?/)[0]
    // }
    // if (this.user.altura_m){
    //   this.user.altura_m = this.user.altura_m.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    // }
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  ionViewDidLoad() {
  }

  async ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem("userData"));
    // if (this.user.peso_kg){
    //   this.user.peso_kg = this.user.peso_kg.match(/^-?\d+(?:\.\d{0,2})?/)[0]
    // }
    // if (this.user.altura_m){
    //   this.user.altura_m = this.user.altura_m.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    // }
    let date = this.user.dt_nasc.toString().split("-")
    this.dt_nasc = `${date[2]}/${date[1]}/${date[0]}`
    this.picture = ''
  }

  async setOptionalInfo(){
    let altura = 0;
    let peso = 0;
    if (this.optionalData["altura_m"] && this.optionalData["altura_m"] != null && this.optionalData["altura_m"] != undefined){
      altura = parseFloat(this.optionalData["altura_m"]);
    }
    if (this.optionalData["peso_kg"] && this.optionalData["peso_kg"] != null && this.optionalData["peso_kg"] != undefined){
      peso = parseFloat(this.optionalData["peso_kg"]);
    }
  }

  async updateUserInfo(){
    this.formatarCamposNumericos();
    if (!this.validateDtNasc()){
      this.showToast("Data de nascimento inválida", "top");
      return false;
    }
    this.user.dt_nasc = this.getDtNascFormatted(this.dt_nasc);
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

  getDtNascFormatted(dt_nasc: string){
    var fullDate = this.dt_nasc;
    var length = fullDate.length;
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
    return year + "-" + month  + "-" + day;
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

  salvarValor(campo, valor, event){
    console.log("SALVANDO O VALOR DO CAMPO '" + campo + "' que é = " + valor);
    if (valor && valor.length > 5)
      return false;
    if (event && (event.key == "." || event.key == ","))
      if (valor && valor.length > 0 && (valor.indexOf(',') != -1 || valor.indexOf('.') != -1))
        return false;

    this.backup_peso = this.user.peso_kg;
    this.backup_altura = this.user.altura_m;
    this.backupSelecionado = campo;
  }

  validarValor(valor){
    let regexp = /^\d*\.?\d*\,?\d*$/;
    let field = valor;
    console.log("backup selecionado é o " + this.backupSelecionado);
    console.log("valor eh ", field)
    if (!regexp.test(field)){
      console.log("nao passou no teste bb")
      if (this.backupSelecionado == 'peso'){
        console.log("eh o peso")
        this.user.peso_kg = this.backup_peso;
      } else if (this.backupSelecionado == 'altura'){
        this.user.altura_m = this.backup_altura;
      }
    }
    console.log("SAINDO DA VALIDACAO")
    this.backup_peso = "";
    this.backup_altura = "";
  }

  async formatarCamposNumericos(){
    let valid = true;

    //VALIDACAO PESO
    if (this.user.peso_kg && this.user.peso_kg.length > 0){
      if (this.user.peso_kg.indexOf(',') != -1){
        this.user.peso_kg = this.user.peso_kg.replace(',', '.');
      }
      if (this.user.peso_kg.indexOf('.') != -1 && this.user.peso_kg[this.user.peso_kg.length - 1] == '.'){
        this.user.peso_kg = this.user.peso_kg.replace(".", "");
      }
    }

    //VALIDACAO ALTURA, SIM, VARIOS CÓDIGO Q PODIAM SER REDUZIDO PQ FODA-SE
    if (this.user.altura_m && this.user.altura_m.length > 0){
      if (this.user.altura_m.indexOf(',') != -1){
        this.user.altura_m = this.user.altura_m.replace(',', '.');
      }
      if (this.user.altura_m.indexOf('.') != -1 && this.user.altura_m[this.user.altura_m.length - 1] == '.'){
        this.user.altura_m = this.user.altura_m.replace(".", "");
      }
    }
  }

  openUpdateLoginInfo(){
    this.navCtrl.push('UpdateLoginInfoPage');
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
