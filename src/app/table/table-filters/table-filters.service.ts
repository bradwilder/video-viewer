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
		this.filtersChanged.next();
	}
	
	addFilter(filterName: string, filter: Function)
	{
		this.removeFilter(filterName);
		this.filters[filterName] = filter;
		this.filtersChanged.next();
	}
	
	removeFilter(name: string)
	{
		delete this.filters[name];
		this.filtersChanged.next();
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
			for (const filterName in this.filters)
			{
				if (this.filters.hasOwnProperty(filterName))
				{
					filtered = filtered.filter(this.filters[filterName]);
				}
			}
		}
		
		return filtered;
	}
}