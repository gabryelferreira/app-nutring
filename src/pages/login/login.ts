import { IntroductionPage } from './../introduction/introduction';
import { RegisterPage } from './../register/register';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as service from './login.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ToastController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

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

  loadingLogin: boolean = false;
  loadingFacebookLogin: boolean = false;
  loadingSomething: boolean = false;
  validLogin: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private get: service.LoginGetService, private post: service.LoginPostService,
    private fb: Facebook, private toastCtrl: ToastController, private keyboard: Keyboard) {
  }

  getLoadingLogin() { return this.loadingLogin; }
  setLoadingLogin(loadingLogin: boolean) { this.loadingLogin = loadingLogin; this.loadingSomething = loadingLogin; }

  getLoadingFacebookLogin() { return this.loadingFacebookLogin; }
  setLoadingFacebookLogin(loadingFacebookLogin: boolean) { this.loadingFacebookLogin = loadingFacebookLogin; this.loadingSomething = loadingFacebookLogin; }

  getLoadingSomething() { return this.loadingSomething; }

  stopLoading() { this.loadingFacebookLogin = false; this.loadingLogin = false; this.loadingSomething = false; }

  setValidLogin(validLogin: boolean){this.validLogin = validLogin;}


  ionViewDidLoad() {
    this.keyboard.disableScroll(true);
  }

  async login() {
    this.setLoadingLogin(true);
    let result = await this.post.login(this.user.email, this.user.senha)
    this.entrar(result)
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage)
  }

  loginFacebook() {
    this.setLoadingFacebookLogin(true);
    this.fb.login(['public_profile', 'email', 'user_birthday', 'user_gender'])
      .then(() => this.fb.api('/me?fields=id,name,email,birthday,gender', []).then(async (res) => {
        console.log('Logged into Facebook!', res)
        let result = await this.post.connectWithFacebook(res)
        this.entrar(result)
      }))
      .catch(e => { console.log('Error logging into Facebook', e); this.stopLoading() });
  }

  entrar(result) {
    if (result.success) {
      if (result.result == "INVALID_LOGIN") {
        this.showToast("Login inválido", "top");
      } else if (result.result == "ERROR") {
        this.showToast("Ocorreu um erro! Tente novamente.", "top");
      } else {
        let userData = result.result;
        localStorage.setItem("userData", JSON.stringify(userData))
        if (userData.acessos == 1)
          this.navCtrl.push(IntroductionPage)
        else
          this.navCtrl.push(TabsPage)
      }
    }
    if (!localStorage.getItem("userData"))
      this.stopLoading();
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

  validateLogin(){
    if (this.user.email.length > 0 && this.user.senha.length > 0)
      this.setValidLogin(true);
    else
      this.setValidLogin(false);
  }

}
