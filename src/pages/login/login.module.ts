import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LoginPage } from "./login";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [LoginPage],
  imports: [IonicPageModule.forChild(LoginPage), ComponentsModule],
  exports: [LoginPage],
  providers: []
})
export class LoginPageModule {}
