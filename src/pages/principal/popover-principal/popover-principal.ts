import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverPrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-principal',
  templateUrl: 'popover-principal.html',
})
export class PopoverPrincipalPage {

  items;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl: ViewController) {
    this.items = [
      {action: 'novaCategoria', text: "Nova categoria"},
      {action: 'editCategorias', text: "Editar categorias"}
    ]
  }

  ionViewDidLoad() {
  }

  dismiss(item){
    this.viewCtrl.dismiss(item);
  }

}
