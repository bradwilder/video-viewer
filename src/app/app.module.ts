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


@NgModule({
  declarations: [
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
    TimeInputComponent
  ],
  imports: [
	BrowserModule,
	HttpModule,
	FormsModule
  ],
  providers: [DataService, VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
