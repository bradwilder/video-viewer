import { Video } from "../../video/video.model";
import { Subject } from "rxjs/Subject";

export class TableSortingService
{
	private sortedColumn = 'name';
	private sortedAsc = true;
	sortingChanged = new Subject<void>();
	
	headerClicked(column: string)
	{
		if (this.sortedColumn === column)
		{
			this.sortedAsc = !this.sortedAsc;
		}
		else
		{
			this.sortedColumn = column;
		}
		this.sortingChanged.next();
	}
	
	private nameSort(videoA: Video, videoB: Video)
	{
		const strA = videoA.fileName.toLocaleLowerCase();
		const strB = videoB.fileName.toLocaleLowerCase();
		
		if (strA < strB)
		{
			return -1;
		}
		else if (strA === strB)
		{
			return 0;
		}
		else
		{
			return 1;
		}
	}
	
	private nameSortDesc(videoA: Video, videoB: Video)
	{
		const strA = videoA.fileName.toLocaleLowerCase();
		const strB = videoB.fileName.toLocaleLowerCase();
		
		if (strB < strA)
		{
			return -1;
		}
		else if (strB === strA)
		{
			return 0;
		}
		else
		{
			return 1;
		}
	}
	
	private timeSort(videoA: Video, videoB: Video)
	{
		return videoA.time - videoB.time;
	}
	
	private timeSortDesc(videoA: Video, videoB: Video)
	{
		return videoB.time - videoA.time;
	}
	
	private seriesSort(videoA: Video, videoB: Video)
	{
		const seriesA = videoA.series ? videoA.series : '';
		const seriesB = videoB.series ? videoB.series : '';
		
		if (seriesA < seriesB)
		{
			return -1;
		}
		else if (seriesA === seriesB)
		{
			return 0;
		}
		else
		{
			return 1;
		}
	}
	
	private seriesSortDesc(videoA: Video, videoB: Video)
	{
		const seriesA = videoA.series ? videoA.series : '';
		const seriesB = videoB.series ? videoB.series : '';
		
		if (seriesB < seriesA)
		{
			return -1;
		}
		else if (seriesB === seriesA)
		{
			return 0;
		}
		else
		{
			return 1;
		}
	}
	
	private modifiedSort(videoA: Video, videoB: Video)
	{
		const timeA = videoA.lastModified.getTime();
		const timeB = videoB.lastModified.getTime();
		
		return timeA - timeB;
	}
	
	private modifiedSortDesc(videoA: Video, videoB: Video)
	{
		const timeA = videoA.lastModified.getTime();
		const timeB = videoB.lastModified.getTime();
		
		return timeB - timeA;
	}
	
	sort(videos: Video[]): Video[]
	{
		switch (this.sortedColumn)
		{
			case 'name':
				if (this.sortedAsc)
				{
					return videos.sort(this.nameSort);
				}
				else
				{
					return videos.sort(this.nameSortDesc);
				}
			case 'time':
				if (this.sortedAsc)
				{
					return videos.sort(this.timeSort);
				}
				else
				{
					return videos.sort(this.timeSortDesc);
				}
			case 'series':
				if (this.sortedAsc)
				{
					return videos.sort(this.seriesSort);
				}
				else
				{
					return videos.sort(this.seriesSortDesc);
				}
			case 'modified':
				if (this.sortedAsc)
				{
					return videos.sort(this.modifiedSort);
				}
				else
				{
					return videos.sort(this.modifiedSortDesc);
				}
		}
	}
}