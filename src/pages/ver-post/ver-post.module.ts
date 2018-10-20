import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerPostPage } from './ver-post';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    VerPostPage,
  ],
  imports: [
    IonicPageModule.forChild(VerPostPage),
    ComponentsModule
  ],
  exports: [
    VerPostPage
  ]
})
export class VerPostPageModule {}
