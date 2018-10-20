import { MontarPratoGetService, MontarPratoPostService } from './montar-prato.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MontarPratoPage } from './montar-prato';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MontarPratoPage,
  ],
  exports:[
    MontarPratoPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MontarPratoPage),
  ],
})
export class MontarPratoPageModule {}
