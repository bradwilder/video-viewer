import { Video } from '../../video/video.model';
import { Subject } from 'rxjs/Subject';

export class TableFiltersService
{
	private filters = {};
	filtersChanged = new Subject<void>();
	private enabled = false;
	enabledChanged = new Subject<boolean>();
	cleared = new Subject<void>();
	
	setEnabled(enabled: boolean)
	{
		this.enabled = enabled;
		this.enabledChanged.next(this.enabled);
		if (this.hasFilters())
		{
			this.filtersChanged.next();
		}
	}
	
	addFilter(name: string, filter: Function)
	{
		this.removeFilterImpl(name, true);
		this.filters[name] = filter;
		this.filtersChanged.next();
	}
	
	removeFilter(name: string)
	{
		this.removeFilterImpl(name, false);
	}
	
	private removeFilterImpl(name: string, suppressEvent: boolean)
	{
		if (this.filters[name])
		{
			delete this.filters[name];
			if (!suppressEvent)
			{
				this.filtersChanged.next();
			}
		}
	}
	
	clear()
	{
		this.filters = {};
		this.filtersChanged.next();
		this.enabled = false;
		this.enabledChanged.next(this.enabled);
		this.cleared.next();
	}
	
	filter(videos: Video[]): Video[]
	{
		let filtered = videos.slice();
		
		if (this.enabled)
		{
			for (const name in this.filters)
			{
				if (this.filters.hasOwnProperty(name))
				{
					filtered = filtered.filter(this.filters[name]);
				}
			}
		}
		
		return filtered;
	}
	
	private hasFilters()
	{
		for (const name in this.filters)
		{
			if (this.filters.hasOwnProperty(name))
			{
				return true;
			}
		}
		
		return false;
	}
}