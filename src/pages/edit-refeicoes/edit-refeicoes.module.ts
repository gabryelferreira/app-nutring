import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditRefeicoesPage } from './edit-refeicoes';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EditRefeicoesPage,
  ],
  imports: [
    IonicPageModule.forChild(EditRefeicoesPage),
    ComponentsModule
  ],
  exports: [
    EditRefeicoesPage
  ]
})
export class EditRefeicoesPageModule {}
