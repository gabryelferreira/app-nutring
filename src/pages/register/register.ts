import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as service from './register.service';
import { IntroductionPage } from '../introduction/introduction';
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
    data_nasc: "",
    sexo: "",
    email: "",
    usuario: "",
    senha: "",
    telefone: ""
  }
  validUser = ["nome", "data_nasc", "sexo", "email", "usuario", "senha", "telefone"];

  constructor(public navCtrl: NavController, public navParams: NavParams, private post: service.RegisterPostService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(){
    if (this.validFields()){
      console.log("user ", this.user)
      let result = await this.post.register(this.user);
      console.log("RESULT = ", result);
      if (result.success){
        localStorage.setItem("userData", JSON.stringify(result.result));
          this.navCtrl.push(IntroductionPage)
      }
    } else {
      console.log("nao ta valido")
    }

  }

  validFields(){
    var length = this.validUser.length;
    var count = 0;
    this.validUser.forEach(element => {
      this.user[element] != "" ? count++ : '';
    });
    console.log("LENGTH = ", length)
    console.log("COUNT = ", count)
    var valid = false;
    count == length ? valid = true : valid = false
    return valid
  }

  goToLogin(){
    this.navCtrl.pop();
  }

}
