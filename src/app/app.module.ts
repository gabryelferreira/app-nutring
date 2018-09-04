import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { SettingsPage } from '../pages/settings/settings';
import { IntroductionPage } from '../pages/introduction/introduction';
import { MontarPratoPage } from '../pages/montar-prato/montar-prato';
import { SearchPage } from '../pages/search/search';
import { MeusPratosPage } from '../pages/meus-pratos/meus-pratos';
import { InputMaskModule } from 'ionic-input-mask';
import { BrMaskerModule } from 'brmasker-ionic-3';
import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider
} from "angular-6-social-login-v2"

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("203136383666725")
      }
    ]
  )
  return config;
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    SettingsPage,
    IntroductionPage,
    MontarPratoPage,
    SearchPage,
    MeusPratosPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InputMaskModule,
    BrMaskerModule,
    SocialLoginModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    SettingsPage,
    IntroductionPage,
    MontarPratoPage,
    SearchPage,
    MeusPratosPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
  ]
})
export class AppModule { }
