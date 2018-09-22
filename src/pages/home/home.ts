import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Tabs } from "ionic-angular";
import { SettingsService } from "../settings/settings.service";
import { IUser } from "../../app/types";
import * as service from "./home.service";
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [service.HomePostService, service.HomeGetService]
})
export class HomePage {
  selectedTheme: String = "";
  user: IUser = {
    altura_m: "",
    cep: "",
    dt_nasc: "",
    email: "",
    foto: "",
    id_usuario: 0,
    nome: "",
    peso_kg: "",
    senha: "",
    sexo: "",
    sobrenome: "",
    telefone: "",
    usuario: ""
  };
  kcalMeta: number = 0;
  kcalConsumida: number;
  imgTeste = "http://www.leisureopportunities.com/images/247215_898310.jpg";
  sizeTeste = "small";
  rate: number = 3.55245;
  stars = [
    { star: "md-star-outline", value: 1 },
    { star: "md-star-outline", value: 2 },
    { star: "md-star-outline", value: 3 },
    { star: "md-star-outline", value: 4 },
    { star: "md-star-outline", value: 5 }
  ];

  constructor(
    private tabs: Tabs,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _settings: SettingsService,
    private post: service.HomePostService,
    private get: service.HomeGetService
  ) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem("userData"));
    // let nome = this.user.nome.split(' ');
    // this.user.nome =  nome[0] + " " +nome[1]
    this.post
      .getDailyKcal(this.user.id_usuario)
      .then(kcalMeta => (this.kcalMeta = kcalMeta.result.kcal_diaria));
    this.validateRate();
  }

  validateRate() {
    let full = "md-star";
    let half = "md-star-half";
    let none = "md-star-outline";

    let rate = this.rate;

    this.stars.forEach(element => {
      if (element.value <= rate + 0.25) element.star = full;
      else if (element.value <= rate + 0.75) element.star = half;
      else element.star = none;
    });
  }

  async ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem("userData"));
  }

  ionViewDidLoad() {}

  gotoHistorico() {
    this.tabs.select(3);
  }
}
