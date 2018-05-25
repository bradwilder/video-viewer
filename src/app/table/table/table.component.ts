import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from '../../video/video.service';
import { Video } from '../../video/video.model';
import { Subscription } from 'rxjs/Subscription';
import { TableHighlightingService } from './table-highlighting.service';
import { DataService } from '../../data.service';

@Component
({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy
{
	videos: Video[];
	videosChangedSubscription: Subscription;
	selections: Video[] = [];
	selectionsSubscription: Subscription;
	leadSelection: Video;
	leadSelectionSubscription: Subscription;
	
	constructor(private videoService: VideoService, private tableHighlightingService: TableHighlightingService, private dataService: DataService) {}
	
	ngOnInit()
	{
		this.videosChangedSubscription = this.videoService.filteredVideosChanged.subscribe((videos) =>
		{
			this.videos = videos;
		});
		
		this.selectionsSubscription = this.tableHighlightingService.selectionsChanged.subscribe((videos) =>
		{
			this.selections = videos;
		});
		
		this.leadSelectionSubscription = this.tableHighlightingService.leadSelectedChanged.subscribe((video) =>
		{
			this.leadSelection = video;
		});
	}
	
	getDisplayName(video: Video)
	{
		return Video.getDisplayName(video);
	}
	
	getDisplayTime(video: Video)
	{
		return Video.getDisplayTime(video);
	}
	
	getLastModified(video: Video)
	{
		return Video.getLastModified(video);
	}
	
	onRowClick(event: MouseEvent, video: Video)
	{
		if (event.ctrlKey || event.metaKey)
		{
			this.tableHighlightingService.highlightMulti(video);
		}
		else
		{
			this.tableHighlightingService.highlight(video);
		}
	}
	
	isVideoHighlighted(video: Video)
	{
		return this.selections.includes(video);
	}
	
	isVideoLeadHighlighted(video: Video)
	{
		return this.leadSelection === video;
	}
	
	onPendingChange(video: Video)
	{
		if (confirm('Are you sure you want to change the pending value?'))
		{
			this.dataService.updatePending(video).subscribe
			(
				null,
				(error) =>
				{
					video.pending = true;
				}
			);
		}
		else
		{
			window.setTimeout(() =>
			{
				video.pending = true;
			}, 1);
		}
	}
	
	ngOnDestroy()
	{
		this.videosChangedSubscription.unsubscribe();
		this.selectionsSubscription.unsubscribe();
		this.leadSelectionSubscription.unsubscribe();
	}
}
