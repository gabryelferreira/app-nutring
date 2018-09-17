import { NgModule } from '@angular/core';
import { NtNumberPipe } from './nt-number/nt-number';
import { NtMonthPipe } from './nt-month/nt-month';
import { NtNomePratoPipe } from './nt-nome-prato/nt-nome-prato';
import { NtPorcaoPipe } from './nt-porcao/nt-porcao';
@NgModule({
	declarations: [NtNumberPipe,
    NtMonthPipe,
    NtNomePratoPipe,
    NtPorcaoPipe],
	imports: [],
	exports: [NtNumberPipe,
    NtMonthPipe,
    NtNomePratoPipe,
    NtPorcaoPipe]
})
export class PipesModule {}
