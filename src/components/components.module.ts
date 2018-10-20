import { NgModule } from "@angular/core";
import { ChartComponent } from "./chart/chart";
import { LoaderComponent } from "./loader/loader";
import { NtSearchbarComponent } from "./nt-searchbar/nt-searchbar";
import { NtListHeaderComponent } from "./nt-list-header/nt-list-header";
import { NtHeaderComponent } from "./nt-header/nt-header";
import { ModalComponent } from "./modal/modal";
import { IonicModule } from "ionic-angular";
@NgModule({
  declarations: [
    ChartComponent,
    LoaderComponent,
    NtSearchbarComponent,
    NtListHeaderComponent,
    NtHeaderComponent,
    ModalComponent
  ],
  imports: [
      IonicModule
    ],
  exports: [
    ChartComponent,
    LoaderComponent,
    NtSearchbarComponent,
    NtListHeaderComponent,
    NtHeaderComponent,
    ModalComponent
  ]
})
export class ComponentsModule {}
