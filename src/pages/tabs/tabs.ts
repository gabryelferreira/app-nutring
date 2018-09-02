import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { MontarPratoPage } from '../montar-prato/montar-prato';
import { SearchPage } from '../search/search';
import { MeusPratosPage } from '../meus-pratos/meus-pratos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MontarPratoPage;
  tab2Root = SearchPage;
  tab3Root = MeusPratosPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
