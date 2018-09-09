import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SettingsService } from '../settings/settings.service';
import { elementEnd } from '@angular/core/src/render3/instructions';
import { ProfilePostService, ProfileGetService } from './profile.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [
    ProfilePostService,
    ProfileGetService
  ]
})

export class ProfilePage {

  selectedTheme: String = "";
  user = {};
  page = "pessoais";

  loadingOptional: boolean = false;
  loadingPersonal: boolean = false;

  checkOptional = [{field: 'peso_kg', name: 'Peso', end: 'inválido'}, {field: 'altura_m', name: 'Altura', end: 'inválida'}];
  optionalData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _settings: SettingsService, 
              private toastCtrl: ToastController, private post: ProfilePostService) {
    this._settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.user = JSON.parse(localStorage.getItem("userData"));
  }

  ionViewDidLoad() {
  }

  async updateUserOptionalInfo(){
    if(this.validFields()){
      this.loadingOptional = true;
      
      this.optionalData.forEach(element => {
        let field = element.field;
        if (field != null && field != "" && field != undefined){
          if (field.indexOf(',') != -1){
            element.field = field.replace(',', '.');
          }
        }
      });

      let altura = parseFloat(this.optionalData["altura_m"]);
      let peso = parseFloat(this.optionalData["peso_kg"]);
      let data = {id_usuario: this.user["id_usuario"], altura_m: altura, peso_kg: peso}
      let result = await this.post.updateUserOptionalInfo(JSON.stringify(data))
      if (result.success){
        localStorage.setItem("userData", JSON.stringify(result.result))
        this.showToast("Dados salvos com sucesso!", "top");
      } else {
        this.showToast("Ocorreu um erro! Tente novamente.", "top");
      }
      this.loadingOptional = false;
    }
  }

  async updateUserPersonalInfo(){
    if (this.validPersonalFields()){
      this.loadingPersonal = true;
      let result = await this.post.updateUserPersonalInfo(JSON.stringify(this.user));
      if (result.success){
        localStorage.setItem("userData", JSON.stringify(result.result))
        this.showToast("Dados salvos com sucesso!", "top");
      } else {
        this.showToast("Ocorreu um erro! Tente novamente.", "top");
      }
      this.loadingPersonal = false;
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
    if (field.length > 5)
      return false;
  }

}
