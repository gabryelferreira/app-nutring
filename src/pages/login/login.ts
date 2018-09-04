import { RegisterPage } from './../register/register';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as service from './login.service';
import { IntroductionPage } from '../introduction/introduction';
import {
  AuthService,
  FacebookLoginProvider
} from 'angular-6-social-login-v2';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(private socialAuthService: AuthService, public navCtrl: NavController, public navParams: NavParams, private get: service.LoginGetService, private post: service.LoginPostService) {
    
  }

  ionViewDidLoad() {

  }

  async login(){
    let data = new FormData()
    data.append("email", this.user.email)
    data.append("senha", this.user.senha)
    let result = await this.post.login(data)
    console.log("RESULT = ", result)
    this.entrar(result)
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage)
  }

  socialSignIn(socialPlatform: string) {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      async (userData) => {
        console.log(socialPlatform + " sign in data : ", userData)
        let result = await this.post.connectWithFacebook(userData)
        console.log("usuario logado: ", result)
        this.entrar(result)
      }
    );
  }

  entrar(result){
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
