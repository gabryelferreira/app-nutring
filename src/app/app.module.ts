import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { TabsPage } from "../pages/tabs/tabs";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HttpClientModule } from "@angular/common/http";
import { BrMaskerModule } from "brmasker-ionic-3";
import { Facebook } from "@ionic-native/facebook";
import { SettingsService } from "../pages/settings/settings.service";
import { SocialSharing } from "@ionic-native/social-sharing";
import { PipesModule } from "../pipes/pipes.module";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Keyboard } from '@ionic-native/keyboard';
import { Camera } from "@ionic-native/camera";
import { HideService } from "./hide.service";
import { ComponentsModule } from '../components/components.module';
import { ScrollHideDirective } from "../components/hide-on-scrolling/scroll-hide-directive";
import { AppMinimize } from '@ionic-native/app-minimize';
@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ScrollHideDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // InputMaskModule,
    BrMaskerModule,
    PipesModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    SettingsService,
    SocialSharing,
    LocalNotifications,
    Camera,
    Keyboard,
    HideService,
    AppMinimize,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
