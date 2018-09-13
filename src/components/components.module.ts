import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart';
import { LoaderComponent } from './loader/loader';
@NgModule({
	declarations: [ChartComponent,
    LoaderComponent],
	imports: [],
	exports: [ChartComponent,
    LoaderComponent]
})
export class ComponentsModule {}
