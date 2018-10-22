import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimelinePage } from './timeline';

@NgModule({
  declarations: [
    TimelinePage,
  ],
  imports: [
    IonicPageModule.forChild(TimelinePage),
    ComponentsModule
  ],
  exports: [
    TimelinePage
  ]
})
export class TimelinePageModule {}
