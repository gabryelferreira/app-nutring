import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SugestaoAlimentoPage } from './sugestao-alimento';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SugestaoAlimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(SugestaoAlimentoPage),
    ComponentsModule
  ],
  exports: [
    SugestaoAlimentoPage
  ]
})
export class SugestaoAlimentoPageModule {}
