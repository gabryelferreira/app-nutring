import { TabsPage } from "./../pages/tabs/tabs";
import { Component } from "@angular/core";
import { Platform, App, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SettingsService } from "../pages/settings/settings.service";
import { Keyboard } from "@ionic-native/keyboard";
import { AppMinimize } from '@ionic-native/app-minimize';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = "LoginPage";
  selectedTheme: String;
  pages = ["PrincipalPage", "SearchPage", "MeusPratosPage", "SettingsPage", "LoginPage"];
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    settings: SettingsService,
    Keyboard: Keyboard,
    app: App,
    min:AppMinimize
  ) {
    settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    if (localStorage.getItem("userData")) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = "LoginPage";
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();
      // Keyboard.onKeyboardShow().subscribe(() => {
      //   document.body.classList.add("keyboard-is-open");
      // });
      // Keyboard.onKeyboardHide().subscribe(() => {
      //   document.body.classList.remove("keyboard-is-open");
      // });
      document.addEventListener(
        "backbutton",
        () => {
          let nav = app.getActiveNavs()[0];
          let activeView = nav.getActive();
        
          if (this.pages.indexOf(activeView.id) != -1) {
            min.minimize()
          }else{
            if(nav.canGoBack()){
              nav.pop();
            }else{
              return;
            }
          }

        },
        
      );
    });
  }
}
