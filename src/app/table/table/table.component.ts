import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from '../../video/video.service';
import { Video } from '../../video/video.model';
import { Subscription } from 'rxjs/Subscription';
import { TableHighlightingService } from './table-highlighting.service';

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
	
	constructor(private videoService: VideoService, private tableHighlightingService: TableHighlightingService) {}
	
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
		//debugger;
		//console.log('Before: ' + video.pending);
		video.pending = false;
		//video.fileName = 'Hello.mp4';
		//console.log('After: ' + video.pending);
		// //console.log('Equal: ' + (this.videos[0] === video));
	}
	
	ngOnDestroy()
	{
		this.videosChangedSubscription.unsubscribe();
		this.selectionsSubscription.unsubscribe();
		this.leadSelectionSubscription.unsubscribe();
	}
}
