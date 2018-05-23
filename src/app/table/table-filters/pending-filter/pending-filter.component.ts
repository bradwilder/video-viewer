import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TableFiltersService } from '../table-filters.service';
import { Video } from '../../../video/video.model';

@Component
({
	selector: 'app-pending-filter',
	templateUrl: './pending-filter.component.html'
})
export class PendingFilterComponent implements OnInit
{
	private static filterName = 'pending';
	private static items =
	[
		{key: '0', value: 'Include Pending'},
		{key: '1', value: 'Exclude Pending'},
		{key: '2', value: 'Pending Only'}
	];
	selected = PendingFilterComponent.items[0];
	enabled = false;
	filtersEnabled = false;
	enabledSubscription: Subscription;
	clearedSubscription: Subscription;
	
	constructor(private filtersService: TableFiltersService) {}
	
	private getItems()
	{
		return PendingFilterComponent.items;
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
		if (this.selected.key !== '0')
		{
			this.filtersService.addFilter(PendingFilterComponent.filterName, this.filterFunction.bind(this));
		}
		else
		{
			this.filtersService.removeFilter(PendingFilterComponent.filterName);
		}
	}
	
	onEnable()
	{
		if (this.enabled)
		{
			if (this.selected.key !== '0')
			{
				this.filtersService.addFilter(PendingFilterComponent.filterName, this.filterFunction.bind(this));
			}
			else
			{
				this.filtersService.removeFilter(PendingFilterComponent.filterName);
			}
		}
		else
		{
			this.filtersService.removeFilter(PendingFilterComponent.filterName);
		}
	}
	
	onClear()
	{
		this.selected = PendingFilterComponent.items[0];
		this.enabled = false;
		this.onEnable();
	}
	
	filterFunction(video: Video)
	{
		return video.pending === (this.selected.key === '1' ? false : true);
	}
	
	ngOnDestroy()
	{
		this.enabledSubscription.unsubscribe();
		this.clearedSubscription.unsubscribe();
	}
}
