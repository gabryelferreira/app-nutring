import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { SettingsService } from '../settings/settings.service';
import { IUser } from '../../app/types';
import * as service from './home.service';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [service.HomePostService, service.HomeGetService]
})
export class HomePage {

  selectedTheme: String = "";
  user: IUser = {
    altura_m: "", cep: "", dt_nasc: "", email: "", foto: "", id_usuario: 0, nome: "", peso_kg: "", senha: "", sexo: "", sobrenome: "", telefone: "", usuario: ""
  };
  kcalMeta:number = 0;
  kcalConsumida:number;
  imgTeste = "http://www.leisureopportunities.com/images/247215_898310.jpg";
  sizeTeste = "small";

  constructor(private tabs:Tabs,public navCtrl: NavController, public navParams: NavParams, 
              private _settings: SettingsService, private post:service.HomePostService, private get:service.HomeGetService) {
    _settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.user = JSON.parse(localStorage.getItem("userData"));
    let nome = this.user.nome.split(' '); 
    this.user.nome =  nome[0] + " " +nome[1]
    this.post.getDailyKcal(this.user.id_usuario).then((kcalMeta)=> this.kcalMeta= kcalMeta.result.kcal_diaria)
  }

  async ionViewWillEnter() {
    //this.user = JSON.parse(localStorage.getItem("userData"));
    
  }

  ionViewDidLoad() {
    
  }

  gotoHistorico(){
    this.tabs.select(3)
  }
}
