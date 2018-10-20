import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactMessagesPage } from './contact-messages';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    ContactMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactMessagesPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    ContactMessagesPage
  ]
})
export class ContactMessagesPageModule {}
