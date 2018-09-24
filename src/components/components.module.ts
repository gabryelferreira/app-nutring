import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart';
import { LoaderComponent } from './loader/loader';
import { NtSearchbarComponent } from './nt-searchbar/nt-searchbar';
import { NtListHeaderComponent } from './nt-list-header/nt-list-header';
@NgModule({
	declarations: [ChartComponent,
    LoaderComponent,
    NtSearchbarComponent,
    NtListHeaderComponent],
	imports: [],
	exports: [ChartComponent,
    LoaderComponent,
    NtSearchbarComponent,
    NtListHeaderComponent]
})
export class ComponentsModule {}
