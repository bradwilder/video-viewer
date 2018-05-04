import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HttpModule } from '@angular/http';
import { TableComponent } from './table/table/table.component';
import { VideoService } from './video/video.service';
import { TableFiltersComponent } from './table/table-filters/table-filters.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableFiltersComponent
  ],
  imports: [
	BrowserModule,
	HttpModule
  ],
  providers: [DataService, VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
