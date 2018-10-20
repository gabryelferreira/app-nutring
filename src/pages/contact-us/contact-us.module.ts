import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactUsPage } from './contact-us';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ContactUsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactUsPage),
    ComponentsModule
  ],
  exports: [
    ContactUsPage
  ]
})
export class ContactUsPageModule {}
