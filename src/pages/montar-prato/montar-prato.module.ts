import { MontarPratoGetService, MontarPratoPostService } from './montar-prato.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MontarPratoPage } from './montar-prato';

@NgModule({
  declarations: [
    MontarPratoPage,
  ],
  imports: [
    IonicPageModule.forChild(MontarPratoPage),
  ],
})
export class MontarPratoPageModule {}
