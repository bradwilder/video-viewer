import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TableFiltersService } from '../table-filters.service';
import { Video } from '../../../video/video.model';
import { SeriesService } from '../../../video/series.service';

@Component
({
	selector: 'app-series-filter',
	templateUrl: './series-filter.component.html'
})
export class SeriesFilterComponent implements OnInit
{
	private static filterName = 'series';
	private static typeItems =
	[
		{key: 0, value: 'Include'},
		{key: 1, value: 'Exclude'},
		{key: 2, value: 'Only'}
	];
	private static initialSeriesNameOptions =
	[
		{key: 0, value: '<All>'}
	];
	
	selectedTypeIndex = 0;
	enabled = false;
	filtersEnabled = false;
	enabledSubscription: Subscription;
	clearedSubscription: Subscription;
	seriesSubscription: Subscription;
	seriesOptions = SeriesFilterComponent.initialSeriesNameOptions;
	selectedSeriesIndex = 0;
	
	constructor(private filtersService: TableFiltersService, private seriesService: SeriesService) {}
	
	private getItems()
	{
		return SeriesFilterComponent.typeItems;
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
		
		this.seriesService.seriesChanged.subscribe((seriesArr) =>
		{
			this.seriesOptions = SeriesFilterComponent.initialSeriesNameOptions.concat(seriesArr.map((seriesName, i) =>
			{
				return {key: i + 1, value: seriesName};
			}));
		});
	}
	
	onChangeType()
	{
		if (this.selectedTypeIndex !== 0)
		{
			this.filtersService.addFilter(SeriesFilterComponent.filterName, this.filterFunction.bind(this));
		}
		else
		{
			this.filtersService.removeFilter(SeriesFilterComponent.filterName);
		}
	}
	
	onChangeSeries()
	{
		this.filtersService.addFilter(SeriesFilterComponent.filterName, this.filterFunction.bind(this));
	}
	
	onEnable()
	{
		if (this.enabled)
		{
			if (this.selectedTypeIndex !== 0)
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
		this.selectedTypeIndex = 0;
		this.selectedSeriesIndex = 0;
		this.enabled = false;
		this.onEnable();
	}
	
	filterFunction(video: Video)
	{
		if (this.selectedTypeIndex === 1)
		{
			return !video.series;
		}
		else if (this.selectedTypeIndex === 2)
		{
			if (this.selectedSeriesIndex === 0)
			{
				return video.series;
			}
			else
			{
				return video.series && video.series === this.seriesOptions[this.selectedSeriesIndex].value;
			}
		}
	}
	
	ngOnDestroy()
	{
		this.enabledSubscription.unsubscribe();
		this.clearedSubscription.unsubscribe();
	}
}
