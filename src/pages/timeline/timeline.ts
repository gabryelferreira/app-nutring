import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsService } from '../settings/settings.service';

/**
 * Generated class for the TimelinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {

  selectedTheme: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              _settings: SettingsService) {
    _settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
  }

  ionViewDidLoad() {
  }

}
