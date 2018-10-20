import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { IntroductionPage } from "./introduction";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [IntroductionPage],
  imports: [IonicPageModule.forChild(IntroductionPage), ComponentsModule],
  exports: [IntroductionPage]
})
export class IntroductionPageModule {}
