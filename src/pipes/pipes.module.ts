import { NgModule } from '@angular/core';
import { NtNumberPipe } from './nt-number/nt-number';
import { NtMonthPipe } from './nt-month/nt-month';
import { NtNomePratoPipe } from './nt-nome-prato/nt-nome-prato';
@NgModule({
	declarations: [NtNumberPipe,
    NtMonthPipe,
    NtNomePratoPipe],
	imports: [],
	exports: [NtNumberPipe,
    NtMonthPipe,
    NtNomePratoPipe]
})
export class PipesModule {}
