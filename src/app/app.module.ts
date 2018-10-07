import { CommentsPage } from "./../pages/home/comments/comments";
import { NtSearchbarComponent } from "./../components/nt-searchbar/nt-searchbar";
import { LoaderComponent } from "./../components/loader/loader";
import { ContactMessagesPage } from "./../pages/contact-us/contact-messages/contact-messages";
import { VerPratoPage } from "./../pages/montar-prato/ver-prato/ver-prato";
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
import { MontarPratoPage } from "../pages/montar-prato/montar-prato";
import { SearchPage } from "../pages/search/search";
import { MeusPratosPage } from "../pages/meus-pratos/meus-pratos";
import { InputMaskModule } from "ionic-input-mask";
import { BrMaskerModule } from "brmasker-ionic-3";
import { Facebook } from "@ionic-native/facebook";
import { SettingsService } from "../pages/settings/settings.service";
import { SocialSharing } from "@ionic-native/social-sharing";
import { InfoPratoPage } from "../pages/meus-pratos/info-prato/info-prato";
import { ProfilePage } from "../pages/profile/profile";
import { ContactUsPage } from "../pages/contact-us/contact-us";
import { ChartComponent } from "../components/chart/chart";
import { SugestaoAlimentoPage } from "../pages/sugestao-alimento/sugestao-alimento";
import { ScrollHideDirective } from "../components/hide-on-scrolling/scroll-hide-directive";
import { EditProfilePage } from "../pages/profile/edit-profile/edit-profile";
import { PipesModule } from "../pipes/pipes.module";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { NtListHeaderComponent } from "../components/nt-list-header/nt-list-header";
import { Keyboard } from '@ionic-native/keyboard';
import { PostPicturePage } from "../pages/post-picture/post-picture";
import { Camera } from "@ionic-native/camera";
import { SearchResultPage } from "../pages/search/search-result/search-result";
import { VerPostPage } from "../pages/ver-post/ver-post";
import { CurtidasPage } from "../pages/curtidas/curtidas";
import { PrincipalPage } from "../pages/principal/principal";
import { CriarRefeicaoPage } from "../pages/principal/criar-refeicao/criar-refeicao";
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
    RegisterPage,
    HomePage,
    PostPicturePage,
    VerPratoPage,
    InfoPratoPage,
    ProfilePage,
    ContactUsPage,
    SugestaoAlimentoPage,
    ContactMessagesPage,
    ChartComponent,
    LoaderComponent,
    NtSearchbarComponent,
    ScrollHideDirective,
    EditProfilePage,
    CommentsPage,
    SearchResultPage,
    NtListHeaderComponent,
    VerPostPage,
    CurtidasPage,
    PrincipalPage,
    CriarRefeicaoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InputMaskModule,
    BrMaskerModule,
    PipesModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    PostPicturePage,
    LoginPage,
    SettingsPage,
    IntroductionPage,
    MontarPratoPage,
    SearchPage,
    MeusPratosPage,
    RegisterPage,
    HomePage,
    VerPratoPage,
    InfoPratoPage,
    SugestaoAlimentoPage,
    ProfilePage,
    ContactUsPage,
    ContactMessagesPage,
    EditProfilePage,
    CommentsPage,
    SearchResultPage,
    VerPostPage,
    CurtidasPage,
    PrincipalPage,
    CriarRefeicaoPage
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
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
