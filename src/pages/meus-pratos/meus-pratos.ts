import { MontarPratoPage } from './../montar-prato/montar-prato';
import {
  MeusPratosPostService,
  MeusPratosGetService
} from "./meus-pratos.service";
import { SettingsService } from "./../settings/settings.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, DateTime, ModalController } from "ionic-angular";
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
  selectedDate: string = "";
  pratos = [];
  firstLoading: boolean = false;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private post: MeusPratosPostService,
              private modalCtrl: ModalController) {
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

  async getPratosByDate(id_usuario: number, date: string) {
    this.loading = true;
    this.pratos = [];
    console.log("dateeee = ", date)
    let result = await this.post.getPratosByDate(id_usuario, date);
    if (result.success) {
      this.pratos = result.result;
    }
    this.loading = false;
  }

  async getMonthsOfPratos(id_usuario: number) {
    this.firstLoading = true;
    this.loading = true;
    let result = await this.post.getMonthsOfPratos(id_usuario);
    if (result.success) {
      for (var i = 0; i < result.result.length; i++){
        this.dateSeparator.push(result.result[i].full_date);
      }
      if (this.dateSeparator.length > 0){
        this.selectedDate = this.dateSeparator[0];
        await this.getPratosByDate(this.id_usuario, this.dateSeparator[0]);
      }
    }
    this.loading = false;
    this.firstLoading = false;
  }

  openPrato(prato) {
    this.navCtrl.push('InfoPratoPage', {
      prato: prato
    });
  }

  goToMontarPrato(){
    this.navCtrl.parent.select(0);
  }

  ionViewDidLoad() {}

  abrirDatas(){
    let datasModal = this.modalCtrl.create("EscolherDataPage", { datas: this.dateSeparator });
    datasModal.onDidDismiss(data => {
      if (data && data != this.selectedDate){
        this.selectedDate = data;
        this.getPratosByDate(this.id_usuario, data);
      }
    });
    datasModal.present();
  }

  refreshPratos(){
    this.getPratosByDate(this.id_usuario, this.selectedDate);
  }

}
