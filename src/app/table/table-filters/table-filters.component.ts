import { Component, ViewEncapsulation } from '@angular/core';
import { TableFiltersService } from './table-filters.service';
import { VideoService } from '../../video/video.service';

@Component
({
	selector: 'app-table-filters',
	templateUrl: './table-filters.component.html',
	styleUrls: ['./table-filters.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TableFiltersComponent
{
	enabled = false;
	open = false;
	
	constructor(private filtersService: TableFiltersService, private videoService: VideoService) {}
	
	onEnable()
	{
		this.filtersService.setEnabled(this.enabled);
	}
	
	onClear()
	{
		this.enabled = false;
		this.filtersService.clear();
	}
}
