import { NgModule } from "@angular/core";
import { NtNumberPipe } from "./nt-number/nt-number";
import { NtMonthPipe } from "./nt-month/nt-month";
import { NtNomePratoPipe } from "./nt-nome-prato/nt-nome-prato";
import { NtDatePipe } from "./nt-date/nt-date";
import { NtGenderPipe } from "./nt-gender/nt-gender";
import { NtCurtidasPipe } from "./nt-curtidas/nt-curtidas";
import { IonicModule } from "ionic-angular";
@NgModule({
  declarations: [
    NtNumberPipe,
    NtMonthPipe,
    NtNomePratoPipe,
    NtDatePipe,
    NtGenderPipe,
    NtCurtidasPipe
  ],
  imports: [
      IonicModule
  ],
  exports: [
    NtNumberPipe,
    NtMonthPipe,
    NtNomePratoPipe,
    NtDatePipe,
    NtGenderPipe,
    NtCurtidasPipe
  ]
})
export class PipesModule {}
