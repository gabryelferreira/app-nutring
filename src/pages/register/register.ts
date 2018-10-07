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
  validRegister: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private post: service.RegisterPostService, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
  }

  transformDtNasc(e: any){
    var allowedKeys = [8, 13, 16, 17, 37, 39, 46] 

    if (allowedKeys.indexOf(e.keyCode) == -1){
        var replace = true;
        while (replace == true){
            if (this.user.dt_nasc.indexOf('/') != -1)
              this.user.dt_nasc = this.user.dt_nasc.replace('/', '')
            else
                replace = false;
        }
        if (this.user.dt_nasc.length <= 2)
          this.user.dt_nasc = this.user.dt_nasc.replace(/(\d{2})/g,"\$1/")
        else if (this.user.dt_nasc.length <= 3)
            this.user.dt_nasc = this.user.dt_nasc.replace(/(\d{2})(\d{1})/g,"\$1/\$2")
        else if (this.user.dt_nasc.length <= 4)
            this.user.dt_nasc = this.user.dt_nasc.replace(/(\d{2})(\d{2})/g,"\$1/\$2/")
        else if (this.user.dt_nasc.length <= 5)
            this.user.dt_nasc = this.user.dt_nasc.replace(/(\d{2})(\d{2})(\d{1})/g,"\$1/\$2/\$3")
        else if (this.user.dt_nasc.length <= 6)
            this.user.dt_nasc = this.user.dt_nasc.replace(/(\d{2})(\d{2})(\d{2})/g,"\$1/\$2/\$3")
        else if (this.user.dt_nasc.length <= 7)
            this.user.dt_nasc = this.user.dt_nasc.replace(/(\d{2})(\d{2})(\d{3})/g,"\$1/\$2/\$3")
        else if (this.user.dt_nasc.length <= 8)
            this.user.dt_nasc = this.user.dt_nasc.replace(/(\d{2})(\d{2})(\d{4})/g,"\$1/\$2/\$3")
    }
    
    
    
  }


  validateDtNasc(e: any){
      var allowed = "0123456789";
      if (allowed.indexOf(e.key) != -1)
          return true;
      return false;
      
  };


  async register(){
    this.loading = true;
    let result = await this.post.register(JSON.stringify(this.user));
    if (result.success){
      if (result.result == "USER_EXISTS"){
        this.showToast("Nome de usuário já cadastrado", "top");
      } else if (result.result == "EMAIL_EXISTS"){
        this.showToast("E-mail já cadastrado", "top");
      } else {
        localStorage.setItem("userData", JSON.stringify(result.result));
        this.navCtrl.setRoot(IntroductionPage, {}, {animate: true, direction: 'forward'});
      }
    }
    this.loading = false;

  }

  validFields(){
    var length = this.validUser.length;
    var count = 0;
    this.validUser.forEach(element => {
      this.user[element] != "" ? count++ : '';
    });
    var valid = false;
    count == length ? valid = true : valid = false
    this.validRegister = valid;
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
