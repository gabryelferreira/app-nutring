import { PipesModule } from './../../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerPratoPage } from './ver-prato';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    VerPratoPage,
  ],
  imports: [
    IonicPageModule.forChild(VerPratoPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    VerPratoPage
  ]
})
export class VerPratoPageModule {}
