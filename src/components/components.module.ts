import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart';
import { LoaderComponent } from './loader/loader';
import { NtSearchbarComponent } from './nt-searchbar/nt-searchbar';
import { NtListHeaderComponent } from './nt-list-header/nt-list-header';
import { NtHeaderComponent } from './nt-header/nt-header';
@NgModule({
	declarations: [ChartComponent,
    LoaderComponent,
    NtSearchbarComponent,
    NtListHeaderComponent,
    NtHeaderComponent],
	imports: [],
	exports: [ChartComponent,
    LoaderComponent,
    NtSearchbarComponent,
    NtListHeaderComponent,
    NtHeaderComponent]
})
export class ComponentsModule {}
