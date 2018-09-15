import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SugestaoAlimentoPage } from './sugestao-alimento';

@NgModule({
  declarations: [
    SugestaoAlimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(SugestaoAlimentoPage),
  ],
})
export class SugestaoAlimentoPageModule {}
