import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotPassPage } from './forgot-pass';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ForgotPassPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgotPassPage),
    ComponentsModule
  ],
  exports:[
    ForgotPassPage
  ]
})
export class ForgotPassPageModule {}
