import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurtidasPage } from './curtidas';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CurtidasPage,
  ],
  imports: [
    IonicPageModule.forChild(CurtidasPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    CurtidasPage
  ]
})
export class CurtidasPageModule {}
