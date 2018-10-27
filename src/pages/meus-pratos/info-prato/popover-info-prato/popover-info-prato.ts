import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverInfoPratoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-info-prato',
  templateUrl: 'popover-info-prato.html',
})
export class PopoverInfoPratoPage {

  items;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl: ViewController) {
    this.items = [
      {action: 'edit', text: "Editar"},
      {action: 'delete', text: "Excluir"}
    ]
  }

  ionViewDidLoad() {
  }

  dismiss(item){
    this.viewCtrl.dismiss(item);
  }

}
