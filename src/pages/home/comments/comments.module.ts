import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentsPage } from './comments';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    CommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentsPage),
    ComponentsModule
  ],
  exports: [
    CommentsPage
  ]
})
export class CommentsPageModule {}
