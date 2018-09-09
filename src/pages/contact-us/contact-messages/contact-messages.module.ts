import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactMessagesPage } from './contact-messages';

@NgModule({
  declarations: [
    ContactMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactMessagesPage),
  ],
})
export class ContactMessagesPageModule {}
