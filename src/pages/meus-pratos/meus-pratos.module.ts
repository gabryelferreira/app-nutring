import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusPratosPage } from './meus-pratos';

@NgModule({
  declarations: [
    MeusPratosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusPratosPage),
  ],
})
export class MeusPratosPageModule {}
