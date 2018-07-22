import { Video } from '../../video/video.model';
import { Subject } from 'rxjs/Subject';
import { VideoService } from '../../video/video.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class TableHighlightingService implements OnDestroy
{
	private selections: Video[] = [];
	selectionsChanged = new Subject<Video[]>();
	
	private leadSelected: Video;
	leadSelectedChanged = new Subject<Video>();
	
	private filteredVideosSubscription: Subscription;
	
	constructor(private videoService: VideoService)
	{
		this.filteredVideosSubscription = this.videoService.filteredVideosChanged.subscribe((videos) =>
		{
			const selections = this.selections.slice(0);
			selections.forEach((video) =>
			{
				if (!videos.includes(video))
				{
					this.unhighlightVideo(video);
				}
			});
		});
	}
	
	highlight(video: Video)
	{
		if (this.selections.length !== 1 || this.selections[0] !== video || this.leadSelected !== video)
		{
			this.selections = [];
			this.selections.push(video);
			this.selectionsChanged.next(this.selections);
			
			this.leadSelected = video;
			this.leadSelectedChanged.next(this.leadSelected);
		}
	}
	
	highlightMulti(video: Video)
	{
		if (this.selections.includes(video))
		{
			this.unhighlightVideo(video);
		}
		else
		{
			this.selections.push(video);
			this.selectionsChanged.next(this.selections);
			
			this.leadSelected = video;
			this.leadSelectedChanged.next(this.leadSelected);
		}
	}
	
	unhighlight()
	{
		this.selections = [];
		this.selectionsChanged.next(this.selections);
		
		this.leadSelected = null;
		this.leadSelectedChanged.next(this.leadSelected);
	}
	
	unhighlightVideo(video: Video)
	{
		if (this.selections.includes(video))
		{
			let index = this.selections.indexOf(video);
			this.selections.splice(index, 1);
			this.selectionsChanged.next(this.selections);
			
			if (this.leadSelected === video)
			{
				this.leadSelected = null;
				this.leadSelectedChanged.next(this.leadSelected);
			}
		}
	}
	
	getSelections()
	{
		return this.selections;
	}
	
	getLeadSelected()
	{
		return this.leadSelected;
	}
	
	ngOnDestroy()
	{
		this.filteredVideosSubscription.unsubscribe();
	}
}