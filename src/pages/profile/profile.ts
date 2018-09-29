import { SettingsPage } from './../settings/settings';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SettingsService } from '../settings/settings.service';
import { elementEnd } from '@angular/core/src/render3/instructions';
import { ProfilePostService, ProfileGetService } from './profile.service';
import { IUser } from '../../app/types';
import { EditProfilePage } from './edit-profile/edit-profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [
    ProfilePostService,
    ProfileGetService
  ]
})

export class ProfilePage {

  selectedTheme: String = "";
  user:IUser = {altura_m:"", cep:"",usuario:"",telefone:"",sobrenome:"",sexo:"",email:"",senha:"",dt_nasc:"",peso_kg:"",foto:"",nome:"",id_usuario:0,};
  page = "pessoais";

  loadingOptional: boolean = false;
  loadingPersonal: boolean = false;

  checkOptional = [{field: 'peso_kg', name: 'Peso', end: 'inválido'}, {field: 'altura_m', name: 'Altura', end: 'inválida'}];
  optionalData = [];
  rate: number = 3.55245;
  stars = [
    {star: 'md-star-outline', value: 1},
    {star: 'md-star-outline', value: 2},
    {star: 'md-star-outline', value: 3},
    {star: 'md-star-outline', value: 4},
    {star: 'md-star-outline', value: 5}
  ]

  selectedTab: string = "user";

  tabs = [
    {name: 'user', image: 'ios-person-outline', selected: true},
    {name: 'food', image: 'ios-paper-outline', selected: false},
    {name: 'info', image: 'ios-podium-outline', selected: false}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, _settings: SettingsService, 
              private toastCtrl: ToastController, private post: ProfilePostService) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.validateRate();
  }

  async ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem("userData"));
  }

  selectTab(tab){
    this.selectedTab = tab["name"];
    this.tabs.forEach(tab => {
      tab.selected = false;
    });
    tab.selected = true;
  }

  editProfile(){
    this.navCtrl.push(EditProfilePage, {
      user: this.user
    })
  }

  openSettings(){
    this.navCtrl.push(SettingsPage)
  }

  validateRate(){
    let full = 'md-star';
    let half = 'md-star-half';
    let none = 'md-star-outline';

    let rate = this.rate;

    this.stars.forEach(element => {
      if (element.value <= rate + 0.25)
        element.star = full;
      else if (element.value <= rate + 0.75)
        element.star = half;
      else
        element.star = none;
    });


  }

  ionViewDidLoad() {
  }

}
