import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscolherDataPage } from './escolher-data';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    EscolherDataPage,
  ],
  imports: [
    IonicPageModule.forChild(EscolherDataPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    EscolherDataPage
  ]
})
export class EscolherDataPageModule {}
