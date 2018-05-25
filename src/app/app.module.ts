import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { TableComponent } from './table/table/table.component';
import { VideoService } from './video/video.service';
import { TableFiltersComponent } from './table/table-filters/table-filters.component';
import { ToggleSwitchComponent } from './inputs/toggle-switch/toggle-switch.component';
import { ButtonComponent } from './inputs/button/button.component';
import { CheckboxComponent } from './inputs/checkbox/checkbox.component';
import { DropdownComponent } from './inputs/dropdown/dropdown.component';
import { RadioComponent } from './inputs/radio/radio.component';
import { StarRatingComponent } from './inputs/star-rating/star-rating.component';
import { TextboxComponent } from './inputs/textbox/textbox.component';
import { TimeInputComponent } from './inputs/time-input/time-input.component';
import { PendingFilterComponent } from './table/table-filters/pending-filter/pending-filter.component';
import { NameFilterComponent } from './table/table-filters/name-filter/name-filter.component';
import { TimeFilterComponent } from './table/table-filters/time-filter/time-filter.component';
import { SeriesFilterComponent } from './table/table-filters/series-filter/series-filter.component';
import { TableFiltersService } from './table/table-filters/table-filters.service';
import { TimeInputFilterDirective } from './inputs/time-input/time-input-filter.directive';
import { TableHighlightingService } from './table/table/table-highlighting.service';
import { ImageDetailComponent } from './detail/image-detail/image-detail.component';
import { TablePagerComponent } from './table/table-pager/table-pager.component';
import { TablePagerService } from './table/table-pager/table-pager.service';

@NgModule
({
	declarations:
	[
		AppComponent,
		TableComponent,
		TableFiltersComponent,
		ToggleSwitchComponent,
		ButtonComponent,
		CheckboxComponent,
		DropdownComponent,
		RadioComponent,
		StarRatingComponent,
		TextboxComponent,
		TimeInputComponent,
		PendingFilterComponent,
		NameFilterComponent,
		TimeFilterComponent,
		SeriesFilterComponent,
		TimeInputFilterDirective,
		ImageDetailComponent,
		TablePagerComponent
	],
	imports:
	[
		BrowserModule,
		HttpModule,
		FormsModule
	],
	providers:
	[
		DataService,
		VideoService,
		TableFiltersService,
		TableHighlightingService,
		TablePagerService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
