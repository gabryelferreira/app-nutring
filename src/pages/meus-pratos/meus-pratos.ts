import { MontarPratoPage } from './../montar-prato/montar-prato';
import {
  MeusPratosPostService,
  MeusPratosGetService
} from "./meus-pratos.service";
import { SettingsService } from "./../settings/settings.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, DateTime } from "ionic-angular";
import { InfoPratoPage } from "./info-prato/info-prato";

/**
 * Generated class for the MeusPratosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-meus-pratos",
  templateUrl: "meus-pratos.html",
  providers: [MeusPratosPostService, MeusPratosGetService]
})
export class MeusPratosPage {
  selectedTheme: String = "";
  pratosByDate = [];
  id_usuario: number;
  loading: boolean = false;

  dateSeparator = [];
  selectedDate: number = 0;
  pratos = [];

  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    _settings: SettingsService,
    private post: MeusPratosPostService
  ) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.id_usuario = parseInt(
      JSON.parse(localStorage.getItem("userData")).id_usuario
    );
    this.getMonthsOfPratos(this.id_usuario);
  }

  ionViewDidEnter() {
    let load = localStorage.getItem("loadHistorico")
    if (load){
      this.getMonthsOfPratos(this.id_usuario);
      localStorage.removeItem("loadHistorico");

    }
  }
  

  selectDate(index: number) {
    this.dateSeparator[this.selectedDate].selected = false;
    this.dateSeparator[index].selected = true;
    this.selectedDate = index;
    this.getPratosByDate(this.id_usuario, this.dateSeparator[index]);
  }

  async getPratosByDate(id_usuario: number, date: any) {
    this.loading = true;
    this.pratos = [];
    let result = await this.post.getPratosByDate(
      id_usuario,
      JSON.stringify(date)
    );
    if (result.success) {
      this.pratos = result.result;
    }
    this.loading = false;
  }

  async getMonthsOfPratos(id_usuario: number) {
    this.loading = true;
    let result = await this.post.getMonthsOfPratos(id_usuario);
    if (result.success) {
      await this.getPratosByDate(this.id_usuario, result.result[0]);
      this.dateSeparator = result.result;
      if (this.dateSeparator && this.dateSeparator.length > 0)
        this.dateSeparator[0].selected = true;
    }
    this.loading = false;
  }

  openPrato(prato) {
    this.navCtrl.push(InfoPratoPage, {
      prato: prato
    });
  }

  goToMontarPrato(){
    this.navCtrl.parent.select(1);
  }

  ionViewDidLoad() {}
}
