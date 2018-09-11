import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { SettingsPage } from '../settings/settings';
import { MontarPratoPage } from '../montar-prato/montar-prato';
import { SearchPage } from '../search/search';
import { MeusPratosPage } from '../meus-pratos/meus-pratos';
import { SettingsService } from '../settings/settings.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MontarPratoPage;
  tab3Root = SearchPage;
  tab4Root = MeusPratosPage;
  tab5Root = SettingsPage;
  selectedTheme: String = "";
<<<<<<< HEAD
  showTabs: boolean = true;
  constructor(private settings: SettingsService, private kb: Keyboard) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
=======
  constructor(private settings: SettingsService) {
    this.settings.getTabActiveTheme().subscribe(val => this.selectedTheme = val);
>>>>>>> 3428cd282fad7b0353b5e884dc860d2d8469de01
    if (this.selectedTheme == "" || this.selectedTheme == null || this.selectedTheme == undefined)
      this.selectedTheme = "light-theme-tab";
  }

  ionViewDidEnter() {
    this.kb.onKeyboardShow().subscribe(() => { this.showTabs = false })
    this.kb.onKeyboardHide().subscribe(() => { this.showTabs = true })
  }
}
