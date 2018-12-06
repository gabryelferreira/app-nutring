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
    email: ""
  };
  
  loading: boolean = false;

  popupNaoEncontrado: boolean = false;
  popupEnviado: boolean = false;

  textNaoEncontrado: string = "O e-mail inserido <b>não foi encontrado.</b>";
  textEnviado: string = "As instruções para recuperação de senha <b>foram enviadas para seu e-mail.</b>"

  constructor(public navCtrl: NavController, public navParams: NavParams, private post: ForgotPassPostService) {
  }

  async forgotPass(){
    this.loading = true;
    let result = await this.post.forgotPass(this.user.email);
    if (result.success){
      if (result.result == "INVALID_EMAIL"){
        this.popupNaoEncontrado = true;
      } else if (result.result == true){
        this.popupEnviado = true;
      }
    }
    this.loading = false;
  }

  voltarParaLogin(){
    this.popupEnviado = false;
    this.navCtrl.pop();
  }


}
