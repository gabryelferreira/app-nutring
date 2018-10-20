import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarRefeicaoPage } from './criar-refeicao';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    CriarRefeicaoPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarRefeicaoPage),
    ComponentsModule
  ],
  exports: [
    CriarRefeicaoPage
  ]
})
export class CriarRefeicaoPageModule {}
