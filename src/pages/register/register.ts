import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as service from './register.service';
import { IntroductionPage } from '../introduction/introduction';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [service.RegisterGetService, service.RegisterPostService]
})
export class RegisterPage {

  user = {
    nome: "",
    dt_nasc: "",
    sexo: "",
    email: "",
    usuario: "",
    senha: "",
    telefone: ""
  }
  validUser = ["nome", "dt_nasc", "sexo", "email", "usuario", "senha", "telefone"];
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private post: service.RegisterPostService, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
  }

  async register(){
    if (this.validFields()){
      this.loading = true;
      let result = await this.post.register(JSON.stringify(this.user));
      if (result.success){
        if (result.result == "USER_EXISTS"){
          this.showToast("Nome de usuário já cadastrado", "top");
        } else if (result.result == "EMAIL_EXISTS"){
          this.showToast("E-mail já cadastrado", "top");
        } else {
          localStorage.setItem("userData", JSON.stringify(result.result));
          this.navCtrl.push(IntroductionPage)
        }
      }
      this.loading = false;
    } else {
      this.showToast("Preencha os campos corretamente", "top");
    }

  }

  validFields(){
    var length = this.validUser.length;
    var count = 0;
    this.validUser.forEach(element => {
      this.user[element] != "" ? count++ : '';
    });
    var valid = false;
    count == length ? valid = true : valid = false
    return valid
  }

  goToLogin(){
    this.navCtrl.pop();
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

}
