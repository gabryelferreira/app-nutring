import { ComponentsModule } from './../../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverInfoPratoPage } from './popover-info-prato';

@NgModule({
  declarations: [
    PopoverInfoPratoPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverInfoPratoPage),
    ComponentsModule
  ],
  exports: [
    PopoverInfoPratoPage
  ]
})
export class PopoverInfoPratoPageModule {}
