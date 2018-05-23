import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from '../../video/video.service';
import { Video } from '../../video/video.model';
import { Subscription } from 'rxjs/Subscription';

@Component
({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy
{
	videos: Array<Video>;
	videosChangedSubscription: Subscription;
	
	constructor(private videoService: VideoService) {}
	
	ngOnInit()
	{
		this.videosChangedSubscription = this.videoService.filteredVideosChanged.subscribe((videos) =>
		{
			this.videos = videos;
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
	
	ngOnDestroy()
	{
		this.videosChangedSubscription.unsubscribe();
	}
}
