import { LoginPage } from "./../pages/login/login";
import { TabsPage } from "./../pages/tabs/tabs";
import { Component } from "@angular/core";
import { Platform, Tab } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { RegisterPage } from "../pages/register/register";
import { SettingsService } from "../pages/settings/settings.service";
import { Keyboard } from "@ionic-native/keyboard";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = 'LoginPage';
  selectedTheme: String;

  constructor(platform: Platform,statusBar: StatusBar,splashScreen: SplashScreen,
    settings: SettingsService, Keyboard:Keyboard
  ) {
    settings.getActiveTheme().subscribe(val => (this.selectedTheme = val));
    if (localStorage.getItem("userData")) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = 'LoginPage';
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();
      Keyboard.onKeyboardShow().subscribe(() => {
        console.log("AQUI abriu, ai abriu?")
        document.body.classList.add("keyboard-is-open");
      });
      Keyboard.onKeyboardHide().subscribe(() => {
        console.log("AQUI fechou, ai fechou?")
        document.body.classList.remove("keyboard-is-open");
      });
    });
  }
}
