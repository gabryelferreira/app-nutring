import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoAlimentoPage } from './info-alimento';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    InfoAlimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoAlimentoPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    InfoAlimentoPage
  ]
})
export class InfoAlimentoPageModule {}
