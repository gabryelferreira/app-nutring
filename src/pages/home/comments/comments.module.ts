import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentsPage } from './comments';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    CommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentsPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    CommentsPage
  ]
})
export class CommentsPageModule {}
