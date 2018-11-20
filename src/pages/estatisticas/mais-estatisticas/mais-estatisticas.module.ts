import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaisEstatisticasPage } from './mais-estatisticas';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    MaisEstatisticasPage,
  ],
  imports: [
    IonicPageModule.forChild(MaisEstatisticasPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    MaisEstatisticasPage
  ]
})
export class MaisEstatisticasPageModule {}
