import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurtidasPage } from './curtidas';

@NgModule({
  declarations: [
    CurtidasPage,
  ],
  imports: [
    IonicPageModule.forChild(CurtidasPage),
  ],
})
export class CurtidasPageModule {}
