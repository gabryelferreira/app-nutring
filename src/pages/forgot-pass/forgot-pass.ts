import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ForgotPassPostService } from './forgot-pass.service';

/**
 * Generated class for the ForgotPassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-pass',
  templateUrl: 'forgot-pass.html',
  providers:[
    ForgotPassPostService
  ]
})
export class ForgotPassPage {
  user = {
    email: "",
    senha: ""
  };
  validLogin = false
  constructor(public navCtrl: NavController, public navParams: NavParams, private post: ForgotPassPostService) {
  }

  async forgotPass(){
    let result = await this.post.forgotPass(this.user.email);
    if (result.success){
      
    }
  }


}
