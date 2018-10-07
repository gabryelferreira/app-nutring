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


  validateKeyDtNasc(e: any){
      var allowed = "0123456789";
      if (allowed.indexOf(e.key) != -1)
          return true;
      return false;
  };

  validateDtNasc(){
    var date = null;
    var fullDate = this.user.dt_nasc;
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
  }
  



  async register(){
    if (!this.validateDtNasc()){
      this.showToast("Data de nascimento inválida", "top");
      return false;
    }
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
    console.log("to aqui")
    var length = this.validUser.length;
    var count = 0;
    this.validUser.forEach(element => {
      console.log("element", element)
      console.log("this.user", this.user[element])
      console.log("--------------")
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




  transformTelefone(e: any){
    var allowedKeys = [8, 13, 16, 17, 37, 39, 46] 

    if (allowedKeys.indexOf(e.keyCode) == -1){
        var replace = true;
        while (replace == true){
            if (this.user.telefone.indexOf('(') != -1)
              this.user.telefone = this.user.telefone.replace('(', '')
            else
                replace = false;
        }
        replace = true;
        while (replace == true){
            if (this.user.telefone.indexOf(')') != -1)
              this.user.telefone = this.user.telefone.replace(')', '')
            else
                replace = false;
        }
        replace = true;
        while (replace == true){
          if (this.user.telefone.indexOf('-') != -1)
            this.user.telefone = this.user.telefone.replace('-', '')
          else
              replace = false;
      }
        if (this.user.telefone.length > 11)
          this.user.telefone = this.user.telefone.substr(0, 11);
        if (this.user.telefone.length <= 1)
          this.user.telefone = this.user.telefone.replace(/(\d{1})/g,"(\$1")
        else if (this.user.telefone.length <= 2)
            this.user.telefone = this.user.telefone.replace(/(\d{2})/g,"(\$1)")
          else if (this.user.telefone.length <= 3)
          this.user.telefone = this.user.telefone.replace(/(\d{2})(\d{1})/g,"(\$1)\$2")
          else if (this.user.telefone.length <= 4)
            this.user.telefone = this.user.telefone.replace(/(\d{2})(\d{2})/g,"(\$1)\$2")
          else if (this.user.telefone.length <= 5)
            this.user.telefone = this.user.telefone.replace(/(\d{2})(\d{3})/g,"(\$1)\$2")
          else if (this.user.telefone.length <= 6)
            this.user.telefone = this.user.telefone.replace(/(\d{2})(\d{4})/g,"(\$1)\$2-")
          else if (this.user.telefone.length <= 7)
            this.user.telefone = this.user.telefone.replace(/(\d{2})(\d{4})(\d{1})/g,"(\$1)\$2-\$3")
          else if (this.user.telefone.length <= 8)
            this.user.telefone = this.user.telefone.replace(/(\d{2})(\d{4})(\d{2})/g,"(\$1)\$2-\$3")
          else if (this.user.telefone.length <= 9)
            this.user.telefone = this.user.telefone.replace(/(\d{2})(\d{4})(\d{3})/g,"(\$1)\$2-\$3")
          else if (this.user.telefone.length <= 10)
            this.user.telefone = this.user.telefone.replace(/(\d{2})(\d{4})(\d{4})/g,"(\$1)\$2-\$3")
          else if (this.user.telefone.length <= 11)
            this.user.telefone = this.user.telefone.replace(/(\d{2})(\d{5})(\d{4})/g,"(\$1)\$2-\$3")
          
    }
    
    
    
  }


  validateKeyTelefone(e: any){
      var allowed = "0123456789";
      if (allowed.indexOf(e.key) != -1)
          return true;
      return false;
  };



}
