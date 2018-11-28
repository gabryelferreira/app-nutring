import { IUser } from './../../app/types';
import { EditarObjetivoGetService, EditarObjetivoPostService } from './editar-objetivo.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SettingsService } from '../settings/settings.service';

/**
 * Generated class for the EditarObjetivoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-objetivo',
  templateUrl: 'editar-objetivo.html',
  providers: [
    EditarObjetivoGetService, EditarObjetivoPostService
  ]
})
export class EditarObjetivoPage {

  selectedTheme: String = "";
  cd_objetivo: string = "";
  vl_objetivo_kg: string = "";
  ds_objetivo: string = "";
  
  backup_vl_objetivo: string = "";
  backup_peso: string = "";
  backup_altura: string = "";
  
  backupSelecionado: string = "";

  checkOptional = [{field: 'peso_kg', name: 'Peso', end: 'inválido'}, {field: 'altura_m', name: 'Altura', end: 'inválida'}];

  user: IUser = {};

  salvando: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private viewCtrl: ViewController, private post: EditarObjetivoPostService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
  }

  ionViewDidLoad() {
    this.cd_objetivo = this.navParams.get("cd_objetivo");
    this.vl_objetivo_kg = this.navParams.get("vl_objetivo_kg");
    this.user = this.navParams.get("user");
    this.modelChangeObjetivo();
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

  modelChangeObjetivo(){
    if (this.cd_objetivo == "MANTER"){
      this.vl_objetivo_kg = null;
    }
    if (this.cd_objetivo)
      this.ds_objetivo = this.cd_objetivo.toLowerCase();
  }

  salvarValor(campo, valor, event){
    if (valor && valor.length > 5)
      return false;
    if (event && (event.key == "." || event.key == ","))
      if (valor && valor.length > 0 && (valor.indexOf(',') != -1 || valor.indexOf('.') != -1))
        return false;

    this.backup_peso = this.user.peso_kg;
    this.backup_altura = this.user.altura_m;
    this.backup_vl_objetivo = this.vl_objetivo_kg;
    this.backupSelecionado = campo;
  }

  validarValor(valor){
    let regexp = /^\d*\.?\d*\,?\d*$/;
    let field = valor;
    if (!regexp.test(field)){
      if (this.backupSelecionado == 'peso'){
        this.user.peso_kg = this.backup_peso;
      } else if (this.backupSelecionado == 'altura'){
        this.user.altura_m = this.backup_altura;
      } else {
        this.vl_objetivo_kg = this.backup_vl_objetivo;
      }
    }
    this.backup_vl_objetivo = "";
    this.backup_peso = "";
    this.backup_altura = "";
  }

  async salvarDadosPessoais(){
    let result = await this.post.atualizarAlturaPeso(this.user.id_usuario, this.user.altura_m, this.user.peso_kg);
  }

  async salvarObjetivo(){
    let result = await this.post.salvarObjetivo(this.user.id_usuario, this.cd_objetivo, this.vl_objetivo_kg);
    if (result.success){
      this.viewCtrl.dismiss("salvo");
    }
  }

  async validarESalvar(){
    let valid = true;

    //VALIDACAO OBJETIVO
    if (this.vl_objetivo_kg && this.vl_objetivo_kg.length > 0){
      if (this.vl_objetivo_kg.indexOf(',') != -1){
        this.vl_objetivo_kg = this.vl_objetivo_kg.replace(',', '.');
      }
      if (this.vl_objetivo_kg.indexOf('.') != -1 && this.vl_objetivo_kg[this.vl_objetivo_kg.length - 1] == '.'){
        this.vl_objetivo_kg = this.vl_objetivo_kg.replace('.', "");
      }
    }

    //VALIDACAO PESO
    if (this.user.peso_kg && this.user.peso_kg.length > 0){
      if (this.user.peso_kg.indexOf(',') != -1){
        this.user.peso_kg = this.user.peso_kg.replace(',', '.');
      }
      if (this.user.peso_kg.indexOf('.') != -1 && this.user.peso_kg[this.user.peso_kg.length - 1] == '.'){
        this.user.peso_kg = this.user.peso_kg.replace(".", "");
      }
    }

    //VALIDACAO ALTURA, SIM, VARIOS CÓDIGO Q PODIAM SER REDUZIDO PQ FODA-SE
    if (this.user.altura_m && this.user.altura_m.length > 0){
      if (this.user.altura_m.indexOf(',') != -1){
        this.user.altura_m = this.user.altura_m.replace(',', '.');
      }
      if (this.user.altura_m.indexOf('.') != -1 && this.user.altura_m[this.user.altura_m.length - 1] == '.'){
        this.user.altura_m = this.user.altura_m.replace(".", "");
      }
    }
    if (valid){
      this.salvando = true;
      await this.salvarDadosPessoais();
      await this.salvarObjetivo();
      this.salvando = false;
    } else {
      console.log("campos inválidos")
    }
  }

}
