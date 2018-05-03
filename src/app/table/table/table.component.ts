import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../video/video.service';
import { Video } from '../../video/video.model';

@Component
({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit
{
	videos: Array<Video>;
	
	constructor(private videoService: VideoService) {}
	
	ngOnInit()
	{
		this.videos = this.videoService.getVideos();
		
		this.videoService.videosChanged.subscribe((videos) =>
		{
			return this.videos = videos;
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
}
