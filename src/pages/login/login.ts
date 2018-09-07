import { RegisterPage } from './../register/register';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as service from './login.service';
import { IntroductionPage } from '../introduction/introduction';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [service.LoginGetService, service.LoginPostService]
})
export class LoginPage {

  user = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private get: service.LoginGetService, private post: service.LoginPostService, private fb: Facebook) {

  }

  ionViewDidLoad() {

  }

  async login() {
    let data = new FormData()
    data.append("email", this.user.email)
    data.append("senha", this.user.senha)
    let result = await this.post.login(data)
    console.log("RESULT = ", result)
    this.entrar(result)
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage)
  }

  loginFacebook() {
    this.fb.login(['public_profile', 'email', 'email', 'user_birthday', 'user_gender'])
      .then(async (res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res)
        let result = await this.post.connectWithFacebook(res)
        this.entrar(result)
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  entrar(result) {
    if (result.success) {
      console.log(result)
      if (result.result == "INVALID_LOGIN") {
      } else if (result.result == "ERROR") {
      } else {
        localStorage.setItem("userData", JSON.stringify(result.result))
        if (result.result["acessos"] == 1)
          this.navCtrl.push(IntroductionPage)
        else
          this.navCtrl.push(TabsPage)
      }
    }
  }

}
