import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { TableFiltersService } from './table-filters.service';
import { VideoService } from '../../video/video.service';
import { Subscription } from 'rxjs/Subscription';
import { TableHighlightingService } from '../table/table-highlighting.service';

@Component
({
	selector: 'app-table-filters',
	templateUrl: './table-filters.component.html',
	styleUrls: ['./table-filters.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TableFiltersComponent implements OnInit, OnDestroy
{
	enabled = false;
	open = false;
	totalCount = 0;
	filteredCount = 0;
	totalCountChangedSubscription: Subscription;
	filteredCountChangedSubscription: Subscription;
	
	constructor(private filtersService: TableFiltersService, private videoService: VideoService, private tableHighlightingService: TableHighlightingService) {}
	
	ngOnInit()
	{
		this.totalCountChangedSubscription = this.videoService.videosCountChanged.subscribe((total) =>
		{
			this.totalCount = total;
		});
		
		this.filteredCountChangedSubscription = this.videoService.filteredCountChanged.subscribe((total) =>
		{
			this.filteredCount = total;
		});
	}
	
	onEnable()
	{
		this.filtersService.setEnabled(this.enabled);
	}
	
	onClear()
	{
		this.enabled = false;
		this.filtersService.clear();
	}
	
	ngOnDestroy()
	{
		this.totalCountChangedSubscription.unsubscribe();
		this.filteredCountChangedSubscription.unsubscribe();
	}
}
