import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoFoodPage } from './info-food';

@NgModule({
  declarations: [
    InfoFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoFoodPage),
  ],
})
export class InfoFoodPageModule {}
