import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPratoPage } from './info-prato';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    InfoPratoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPratoPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [ 
    InfoPratoPage
  ]
})
export class InfoPratoPageModule {}
