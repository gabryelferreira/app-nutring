import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart';
import { LoaderComponent } from './loader/loader';
import { NtSearchbarComponent } from './nt-searchbar/nt-searchbar';
@NgModule({
	declarations: [ChartComponent,
    LoaderComponent,
    NtSearchbarComponent],
	imports: [],
	exports: [ChartComponent,
    LoaderComponent,
    NtSearchbarComponent]
})
export class ComponentsModule {}
