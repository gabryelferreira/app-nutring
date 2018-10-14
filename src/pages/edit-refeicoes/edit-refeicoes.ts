import { IUser } from './../../app/types';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  selectedRefeicao = {};
  user: IUser = {};
  callback;
  excluindo: boolean = false;
  deleteText = 'Tem certeza que deseja <b>excluir sua refeição personalizada?</b> Todos os pratos dessa refeição terão o nome de "Refeição".';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService, private post: EditRefeicoesPostService,
              private toastCtrl: ToastController) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.user = JSON.parse(localStorage.getItem("userData"));
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
      if (this.refeicoes.length == 0){
        this.navCtrl.pop();
      }
      this.popupOpen = false;
      this.showToast("Refeição excluída.", "top");
      setTimeout(() => {
        this.excluindo = false;
      }, 500);
      
    }
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

}
