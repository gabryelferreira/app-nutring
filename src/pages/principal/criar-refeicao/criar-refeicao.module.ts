import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarRefeicaoPage } from './criar-refeicao';

@NgModule({
  declarations: [
    CriarRefeicaoPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarRefeicaoPage),
  ],
})
export class CriarRefeicaoPageModule {}
