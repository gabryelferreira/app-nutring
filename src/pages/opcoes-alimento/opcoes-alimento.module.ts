import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpcoesAlimentoPage } from './opcoes-alimento';

@NgModule({
  declarations: [
    OpcoesAlimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(OpcoesAlimentoPage),
    ComponentsModule
  ],
  exports: [
    OpcoesAlimentoPage
  ]
})
export class OpcoesAlimentoPageModule {}
