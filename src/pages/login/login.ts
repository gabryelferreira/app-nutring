import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as service from './login.service';
import { IntroductionPage } from '../introduction/introduction';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private get: service.LoginGetService, private post: service.LoginPostService) {
    
  }

  ionViewDidLoad() {

  }

  async login(){
    let data = new FormData();
    data.append("email", this.user.email)
    data.append("senha", this.user.senha)
    let result = await this.post.login(data);
    console.log("RESULT = ", result)
    if (result.success){
      if (result.result == "INVALID_LOGIN"){
        
      } else {
        localStorage.setItem("userData", JSON.stringify(result.result));
        if (result.result["acessos"] == 1)
          this.navCtrl.push(IntroductionPage)
        else
          this.navCtrl.push(TabsPage);
      }
    }
    
  }

}
