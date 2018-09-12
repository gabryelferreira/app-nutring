import { HomePage } from './../home/home';
import { Component } from '@angular/core';
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
  constructor(private settings: SettingsService) {
    this.settings.getTabActiveTheme().subscribe(val => this.selectedTheme = val);
    if (this.selectedTheme == "" || this.selectedTheme == null || this.selectedTheme == undefined)
      this.selectedTheme = "light-theme-tab";
  }

  ionViewDidEnter() {
  }
}
