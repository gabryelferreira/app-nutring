import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateLoginInfoPage } from './update-login-info';

@NgModule({
  declarations: [
    UpdateLoginInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateLoginInfoPage),
  ],
})
export class UpdateLoginInfoPageModule {}
