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

  tab1Root = MontarPratoPage;
  tab2Root = SearchPage;
  tab3Root = MeusPratosPage;
  tab4Root = SettingsPage;
  selectedTheme: String = "";
  constructor(private settings: SettingsService) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }
}
