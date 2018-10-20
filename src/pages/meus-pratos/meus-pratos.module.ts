import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusPratosPage } from './meus-pratos';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    MeusPratosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusPratosPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    MeusPratosPage
  ]
})
export class MeusPratosPageModule {}
