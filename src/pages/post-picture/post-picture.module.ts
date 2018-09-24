import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPicturePage } from './post-picture';
import { PostPictureGetService, PostPicturePostService } from './post-picture.service';

@NgModule({
  declarations: [
    PostPicturePage,
  ],
  imports: [
    IonicPageModule.forChild(PostPicturePage),
  ],
})
export class PostPicturePageModule {}
