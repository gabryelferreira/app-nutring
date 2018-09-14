import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { SettingsPage } from '../settings/settings';
import { MontarPratoPage } from '../montar-prato/montar-prato';
import { SearchPage } from '../search/search';
import { MeusPratosPage } from '../meus-pratos/meus-pratos';
import { SettingsService } from '../settings/settings.service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

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
  loaded:   boolean = false;
  tabIndex: number  = 0;
  constructor(private settings: SettingsService,private nativePageTransitions: NativePageTransitions) {
    this.settings.getTabActiveTheme().subscribe(val => this.selectedTheme = val);
    if (this.selectedTheme == "" || this.selectedTheme == null || this.selectedTheme == undefined)
      this.selectedTheme = "light-theme-tab";
  }

  ionViewDidEnter() {
  }

  private getAnimationDirection(index):string {
    let currentIndex = this.tabIndex;
  
    this.tabIndex = index;
  
    switch (true){
      case (currentIndex < index):
        return('left');
      case (currentIndex > index):
        return ('right');
    }
  }

  public transition(e):void {
    let options: NativeTransitionOptions = {
     direction:this.getAnimationDirection(e.index),
     duration: 250,
     slowdownfactor: -1,
     slidePixels: 0,
     iosdelay: 20,
     androiddelay: 0,
     fixedPixelsTop: 0,
     fixedPixelsBottom: 48
    };
  
    if (!this.loaded) {
      this.loaded = true;
      return;
    }
  
    this.nativePageTransitions.slide(options);
  }
}
