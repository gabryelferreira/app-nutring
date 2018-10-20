import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPicturePage } from './post-picture';
import { PostPictureGetService, PostPicturePostService } from './post-picture.service';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PostPicturePage,
  ],
  imports: [
    IonicPageModule.forChild(PostPicturePage),
    ComponentsModule
  ],
  exports: [
    PostPicturePage
  ]
})
export class PostPicturePageModule {}
