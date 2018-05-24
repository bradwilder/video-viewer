import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TableFiltersService } from '../table-filters.service';
import { Video } from '../../../video/video.model';

@Component
({
	selector: 'app-name-filter',
	templateUrl: './name-filter.component.html'
})
export class NameFilterComponent implements OnInit
{
	private static filterName = 'name';
	selectedName = '';
	enabled = false;
	filtersEnabled = false;
	enabledSubscription: Subscription;
	clearedSubscription: Subscription;
	inputTimeout: number;
	caseInsensitive = true;
	
	constructor(private filtersService: TableFiltersService) {}
	
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
	
	onInput()
	{
		this.clearTimeout();
		
		this.inputTimeout = window.setTimeout(() =>
		{
			this.doFilter();
		}, 2000);
	}
	
	onCaseInsensitiveChange()
	{
		this.clearTimeout();
		
		this.filtersService.addFilter(NameFilterComponent.filterName, this.filterFunction.bind(this));
	}
	
	doFilter()
	{
		if (this.selectedName)
		{
			this.filtersService.addFilter(NameFilterComponent.filterName, this.filterFunction.bind(this));
		}
		else
		{
			this.filtersService.removeFilter(NameFilterComponent.filterName);
		}
	}
	
	onEnable()
	{
		if (this.enabled)
		{
			if (this.selectedName)
			{
				this.filtersService.addFilter(NameFilterComponent.filterName, this.filterFunction.bind(this));
			}
		}
		else
		{
			this.filtersService.removeFilter(NameFilterComponent.filterName);
			this.clearTimeout();
		}
	}
	
	onClear()
	{
		this.selectedName = '';
		this.caseInsensitive = true;
		this.enabled = false;
		this.onEnable();
	}
	
	filterFunction(video: Video)
	{
		if (!this.caseInsensitive)
		{
			return video.fileName.indexOf(this.selectedName) !== -1;
		}
		else
		{
			return video.fileName.toLocaleLowerCase().indexOf(this.selectedName.toLocaleLowerCase()) !== -1;
		}
	}
	
	clearTimeout()
	{
		if (this.inputTimeout)
		{
			window.clearTimeout(this.inputTimeout);
		}
	}
	
	ngOnDestroy()
	{
		this.enabledSubscription.unsubscribe();
		this.clearedSubscription.unsubscribe();
		
		this.clearTimeout();
	}
}
