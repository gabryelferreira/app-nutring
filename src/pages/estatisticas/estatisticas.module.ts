import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstatisticasPage } from './estatisticas';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EstatisticasPage,
  ],
  imports: [
    IonicPageModule.forChild(EstatisticasPage),
    ComponentsModule
  ],
  exports: [
    EstatisticasPage
  ]
})
export class EstatisticasPageModule {}
