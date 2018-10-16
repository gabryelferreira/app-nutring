import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoAlimentoPage } from './info-alimento';

@NgModule({
  declarations: [
    InfoAlimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoAlimentoPage),
  ],
})
export class InfoAlimentoPageModule {}
