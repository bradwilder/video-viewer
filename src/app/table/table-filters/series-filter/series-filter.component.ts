import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TableFiltersService } from '../table-filters.service';
import { Video } from '../../../video/video.model';
import { VideoService } from '../../../video/video.service';

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
		{key: '0', value: 'Include Series'},
		{key: '1', value: 'Exclude Series'},
		{key: '2', value: 'Series Only'}
	];
	private static initialSeriesNameOptions =
	[
		{key: '', value: '<All>'}
	];
	
	selectedType = SeriesFilterComponent.typeItems[0];
	enabled = false;
	filtersEnabled = false;
	enabledSubscription: Subscription;
	clearedSubscription: Subscription;
	seriesSubscription: Subscription;
	seriesOptions = SeriesFilterComponent.initialSeriesNameOptions;
	selectedSeries = SeriesFilterComponent.initialSeriesNameOptions[0];
	
	constructor(private filtersService: TableFiltersService, private videoService: VideoService) {}
	
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
		
		this.videoService.seriesChanged.subscribe((seriesArr) =>
		{
			this.seriesOptions = SeriesFilterComponent.initialSeriesNameOptions.concat(seriesArr.map((seriesName) =>
			{
				return {key: seriesName, value: seriesName};
			});
		}));
	}
	
	onChangeType()
	{
		if (this.selectedType.key !== '0')
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
			if (this.selectedType.key !== '0')
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
		this.selectedType = SeriesFilterComponent.typeItems[0];
		this.selectedSeries = SeriesFilterComponent.initialSeriesNameOptions[0];
		this.enabled = false;
		this.onEnable();
	}
	
	filterFunction(video: Video)
	{
		if (this.selectedType.key === '1')
		{
			return !video.series;
		}
		else if (this.selectedType.key === '2')
		{
			if (this.selectedSeries.key === '')
			{
				return video.series;
			}
			else
			{
				return video.series && video.series === this.selectedSeries.key;
			}
		}
	}
	
	ngOnDestroy()
	{
		this.enabledSubscription.unsubscribe();
		this.clearedSubscription.unsubscribe();
	}
}
