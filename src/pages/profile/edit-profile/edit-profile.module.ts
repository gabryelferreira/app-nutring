import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfilePage } from './edit-profile';
import { ComponentsModule } from '../../../components/components.module';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    EditProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditProfilePage),
    ComponentsModule,
    BrMaskerModule
  ],
  exports: [
    EditProfilePage
  ]
})
export class EditProfilePageModule {}
