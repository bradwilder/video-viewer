import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TableFiltersService } from '../table-filters.service';
import { Video } from '../../../video/video.model';

@Component
({
	selector: 'app-time-filter',
	templateUrl: './time-filter.component.html'
})
export class TimeFilterComponent implements OnInit
{
	private static filterName = 'time';
	private static initialValue = {hours: 0, minutes: 0, seconds: 0, tol: 0};
	hours;
	minutes;
	seconds;
	tol;
	enabled = false;
	filtersEnabled = false;
	enabledSubscription: Subscription;
	clearedSubscription: Subscription;
	inputTimeout: number;
	
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
	
	doFilter()
	{
		if (this.getSeconds() !== 0 && this.getTol() !== 0)
		{
			this.filtersService.addFilter(TimeFilterComponent.filterName, this.filterFunction.bind(this));
		}
		else
		{
			this.filtersService.removeFilter(TimeFilterComponent.filterName);
		}
	}
	
	onEnable()
	{
		if (this.enabled)
		{
			if (this.getSeconds() !== 0 && this.getTol() !== 0)
			{
				this.filtersService.addFilter(TimeFilterComponent.filterName, this.filterFunction.bind(this));
			}
		}
		else
		{
			this.filtersService.removeFilter(TimeFilterComponent.filterName);
			this.clearTimeout();
		}
	}
	
	onClear()
	{
		this.hours = null;
		this.minutes = null;
		this.seconds = null;
		this.tol = null;
				
		this.enabled = false;
		this.onEnable();
	}
	
	filterFunction(video: Video)
	{
		debugger;
		const time = this.getSeconds();
		const tol = this.getTol();
		
		if (tol == 0)
		{
			return video.time === time;
		}
		else
		{
			let min = Math.max(time - tol, 0);
			let max = time + tol;
			
			return video.time >= min && video.time <= max;
		}
	}
	
	getSeconds()
	{
		return (this.hours ? this.hours : 0) * 3600 + (this.minutes ? this.minutes : 0) * 60 + (this.seconds ? this.seconds : 0);
	}
	
	getTol()
	{
		return this.tol ? this.tol : 0;
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
