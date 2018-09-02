import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(RegisterPage),
  ]
})
export class RegisterPageModule {}
