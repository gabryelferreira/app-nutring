import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { PrincipalPage } from './principal';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    PrincipalPage,
  ],
  imports: [
    IonicPageModule.forChild(PrincipalPage),
    ComponentsModule,
  ],
  exports: [
    PrincipalPage
  ]
})
export class PrincipalPageModule {}
