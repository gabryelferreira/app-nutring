import { IUser } from './../../app/types';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';
import { SettingsService } from '../settings/settings.service';
import { EditRefeicoesPostService } from './edit-refeicoes.service';

/**
 * Generated class for the EditRefeicoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-refeicoes',
  templateUrl: 'edit-refeicoes.html',
  providers: [
    EditRefeicoesPostService
  ]
})
export class EditRefeicoesPage {

  selectedTheme: String = "";
  refeicoes = [];
  popupOpen: boolean = false;
  popupCheck: boolean = false;
  selectedRefeicao = {};
  user: IUser = {};
  callback;
  excluindo: boolean = false;
  deleteText = 'Tem certeza que deseja <b>excluir sua refeição personalizada?</b> Todos os pratos dessa refeição terão o nome de "Refeição".';
  checkText = 'Refeição excluída com sucesso.';
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private post: EditRefeicoesPostService,
              private toastCtrl: ToastController, private popoverCtrl: PopoverController) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.getRefeicoesCustom(this.user.id_usuario)
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.refeicoes = this.navParams.get("refeicoes");
    this.callback = this.navParams.get("callback");
  }

  ionViewWillLeave() {
    this.callback().then(()=>{
    });
  }

  async getRefeicoesCustom(id_usuario: number){
    this.loading = true;
    let result = await this.post.getRefeicoesCustom(id_usuario);
    if (result.success){
      this.refeicoes = result.result;
    }
    this.loading = false;
  }

  openModalConfirm(refeicao: any){
    this.selectedRefeicao = refeicao;
    this.popupOpen = true;
  }

  closeModalConfirm(){
    this.popupOpen = false;
  }

  async deletarRefeicaoCustom(refeicao: any){
    this.excluindo = true;
    let result = await this.post.deletarRefeicaoCustom(this.user.id_usuario, refeicao.id_refeicao_usuario);
    if (result.success){
      var refeicoes = this.refeicoes.filter(element => {
        return element.id_refeicao_usuario != refeicao.id_refeicao_usuario;
      });
      this.refeicoes = refeicoes;
      this.popupOpen = false;
      this.popupCheck = true;
      
    }
    this.excluindo = false;
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

  openAdicionarRefeicao(){
    this.navCtrl.push('CriarRefeicaoPage');
  }

  presentPopover(refeicao: any){
    let popover = this.popoverCtrl.create('PopoverEditRefeicoesPage');
    popover.present({
      ev: event
    })
    
    popover.onDidDismiss(data => {
      if (data){
        if (data.action == 'editarRefeicao'){
          this.openEditarRefeicao(refeicao);
        } else if (data.action == 'excluirRefeicao'){
          this.openModalConfirm(refeicao);
        }
      }
    })
  }

  myCallbackFunction = _params => {
    return new Promise((resolve, reject) => {
      if (_params){
        this.getRefeicoesCustom(this.user.id_usuario)
      }
        
      resolve();
    });
  };

  openEditarRefeicao(refeicao: any){
    this.selectedRefeicao = refeicao;
    this.navCtrl.push('CriarRefeicaoPage', {
      refeicao,
      type: "edit",
      callback: this.myCallbackFunction
    })
  }

}
