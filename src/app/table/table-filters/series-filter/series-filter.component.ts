import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TableFiltersService } from '../table-filters.service';
import { Video } from '../../../video/video.model';

@Component
({
	selector: 'app-series-filter',
	templateUrl: './series-filter.component.html'
})
export class SeriesFilterComponent implements OnInit
{
	private static filterName = 'series';
	private static items =
	[
		{key: '0', value: 'Include Series'},
		{key: '1', value: 'Exclude Series'},
		{key: '2', value: 'Series Only'}
	];
	selected = SeriesFilterComponent.items[0];
	seriesName = '';
	enabled = false;
	filtersEnabled = false;
	enabledSubscription: Subscription;
	clearedSubscription: Subscription;
	
	constructor(private filtersService: TableFiltersService) {}
	
	private getItems()
	{
		return SeriesFilterComponent.items;
	}
	
	ngOnInit()
	{
		this.enabledSubscription = this.filtersService.enabledChanged.subscribe((enabled) =>
		{
			this.filtersEnabled = enabled;
		});
		
		this.clearedSubscription = this.filtersService.cleared.subscribe(() =>
		{
			this.onClear();
		});
	}
	
	onChange()
	{
		this.filtersService.addFilter(SeriesFilterComponent.filterName, this.filterFunction.bind(this));
	}
	
	onEnable()
	{
		if (this.enabled)
		{
			if (this.selected.key !== '0')
			{
				this.filtersService.addFilter(SeriesFilterComponent.filterName, this.filterFunction.bind(this));
			}
			else
			{
				this.filtersService.removeFilter(SeriesFilterComponent.filterName);
			}
		}
		else
		{
			this.filtersService.removeFilter(SeriesFilterComponent.filterName);
		}
	}
	
	onClear()
	{
		this.selected = SeriesFilterComponent.items[0];
		this.seriesName = '';
		this.enabled = false;
		this.onEnable();
	}
	
	filterFunction(video: Video)
	{
		if (this.selected.key === '1')
		{
			return !video.series;
		}
		else if (this.selected.key === '2')
		{
			return video.series && video.series === this.seriesName;
		}
	}
	
	ngOnDestroy()
	{
		this.enabledSubscription.unsubscribe();
		this.clearedSubscription.unsubscribe();
	}
}
