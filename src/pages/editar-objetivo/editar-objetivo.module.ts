import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarObjetivoPage } from './editar-objetivo';

@NgModule({
  declarations: [
    EditarObjetivoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarObjetivoPage),
    ComponentsModule
  ],
  exports: [
    EditarObjetivoPage
  ]
})
export class EditarObjetivoPageModule {}
