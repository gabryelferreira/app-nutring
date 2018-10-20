import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(RegisterPage),
    ComponentsModule
  ],
  exports: [
    RegisterPage
  ]
})
export class RegisterPageModule {}
