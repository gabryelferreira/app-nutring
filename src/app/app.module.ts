import { EditRefeicoesPage } from './../pages/edit-refeicoes/edit-refeicoes';
import { CommentsPage } from "./../pages/home/comments/comments";
import { ContactMessagesPage } from "./../pages/contact-us/contact-messages/contact-messages";
import {  } from "./../pages/montar-prato/ver-prato/ver-prato";
import { HomePage } from "./../pages/home/home";
import { RegisterPage } from "./../pages/register/register";
import { LoginPage } from "./../pages/login/login";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { TabsPage } from "../pages/tabs/tabs";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HttpClientModule } from "@angular/common/http";
import { SettingsPage } from "../pages/settings/settings";
import { IntroductionPage } from "../pages/introduction/introduction";
import { SearchPage } from "../pages/search/search";
import { MeusPratosPage } from "../pages/meus-pratos/meus-pratos";
import { InputMaskModule } from "ionic-input-mask";
import { BrMaskerModule } from "brmasker-ionic-3";
import { Facebook } from "@ionic-native/facebook";
import { SettingsService } from "../pages/settings/settings.service";
import { SocialSharing } from "@ionic-native/social-sharing";
import { InfoPratoPage } from "../pages/meus-pratos/info-prato/info-prato";
import { ProfilePage } from "../pages/profile/profile";
import {  } from "../pages/contact-us/contact-us";
import { SugestaoAlimentoPage } from "../pages/sugestao-alimento/sugestao-alimento";
import { ScrollHideDirective } from "../components/hide-on-scrolling/scroll-hide-directive";
import { EditProfilePage } from "../pages/profile/edit-profile/edit-profile";
import { PipesModule } from "../pipes/pipes.module";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Keyboard } from '@ionic-native/keyboard';
import { PostPicturePage } from "../pages/post-picture/post-picture";
import { Camera } from "@ionic-native/camera";
import { SearchResultPage } from "../pages/search/search-result/search-result";
import { VerPostPage } from "../pages/ver-post/ver-post";
import { CurtidasPage } from "../pages/curtidas/curtidas";
import { PrincipalPage } from "../pages/principal/principal";
import { CriarRefeicaoPage } from "../pages/principal/criar-refeicao/criar-refeicao";
import { HideService } from "./hide.service";
import {  } from '../pages/search/info-alimento/info-alimento';
import { ComponentsModule } from '../components/components.module';
@NgModule({
  declarations: [
    MyApp,
    TabsPage,
   

  
    
    
    
    
    


    // ScrollHideDirective,

   
   
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InputMaskModule,
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
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
