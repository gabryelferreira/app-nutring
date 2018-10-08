import { ProfilePage } from "./../profile/profile";
import { HomePage } from "./../home/home";
import { Component } from "@angular/core";
import { SettingsPage } from "../settings/settings";
import { MontarPratoPage } from "../montar-prato/montar-prato";
import { SearchPage } from "../search/search";
import { MeusPratosPage } from "../meus-pratos/meus-pratos";
import { SettingsService } from "../settings/settings.service";
import { PrincipalPage } from "../principal/principal";
import { HideService } from "../../app/hide.service";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = PrincipalPage;
  // tab2Root = MontarPratoPage;
  tab2Root = SearchPage;
  tab3Root = MeusPratosPage;
  tab4Root = ProfilePage;
  tab5Root = SettingsPage;
  selectedTheme: String = "";
  show: boolean = false;

  constructor(settings: SettingsService, private hide:HideService) {
    settings.getTabActiveTheme().subscribe(val => (this.selectedTheme = val));
    this.hide.getShow().subscribe(val => {this.show = val;console.log("ae",this.show)});
    console.log("ae",this.show)
    if (
      this.selectedTheme == "" ||
      this.selectedTheme == null ||
      this.selectedTheme == undefined
    )
      this.selectedTheme = "light-theme-tab";
  }

  ionViewDidEnter() {
    this.hide.getShow().subscribe(val => {this.show = val;console.log("ae",this.show)});
  }
}
