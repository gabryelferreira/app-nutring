import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerPostPage } from './ver-post';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    VerPostPage,
  ],
  imports: [
    IonicPageModule.forChild(VerPostPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    VerPostPage
  ]
})
export class VerPostPageModule {}
