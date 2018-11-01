import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverEditRefeicoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-edit-refeicoes',
  templateUrl: 'popover-edit-refeicoes.html',
})
export class PopoverEditRefeicoesPage {

  items;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl: ViewController) {
    this.items = [
      {action: 'editarRefeicao', text: "Editar"},
      {action: 'excluirRefeicao', text: "Excluir"}
    ]
  }

  ionViewDidLoad() {
  }

  dismiss(item){
    this.viewCtrl.dismiss(item);
  }

}
