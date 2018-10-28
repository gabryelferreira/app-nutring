import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverPrincipalPage } from './popover-principal';

@NgModule({
  declarations: [
    PopoverPrincipalPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverPrincipalPage),
    ComponentsModule
  ],
  exports: [
    PopoverPrincipalPage
  ]
})
export class PopoverPrincipalPageModule {}
