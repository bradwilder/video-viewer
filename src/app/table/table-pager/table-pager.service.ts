import { Subscription } from "rxjs/Subscription";
import { Injectable, OnDestroy } from "@angular/core";
import { VideoService } from "../../video/video.service";
import { Video } from "../../video/video.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TablePagerService implements OnDestroy
{
	private static perPageOptions =
	[
		{key: 10, value: 10},
		{key: 20, value: 20},
		{key: 50, value: 50},
		{key: 60, value: 60},
		{key: 70, value: 70},
		{key: 80, value: 80},
		{key: 100, value: 100},
		{key: 200, value: 200}
	];
	
	static getPerPageOptions()
	{
		return TablePagerService.perPageOptions;
	}
	
	totalPages = 0;
	perPageIndex = 2;
	enabled = true;
	private videos: Video[] = [];
	videosChanged = new Subject<Video[]>();
	currentPageOptions = [];
	currentPageOptionIndex = -1;
	private filteredVideosSubscription: Subscription;
	
	constructor(private videoService: VideoService)
	{
		this.filteredVideosSubscription = this.videoService.filteredVideosChanged.subscribe((videos) =>
		{
			this.videos = videos;
			this.computeCurrentAndTotal();
			this.videosChanged.next(this.getPage());
		});
	}
	
	private computeCurrentAndTotal()
	{
		this.totalPages = Math.ceil(this.videos.length / this.getPerPageValue());
		this.currentPageOptions = [];
		for (let i = 1; i <= this.totalPages; i++)
		{
			this.currentPageOptions.push({key: i, value: i});
		}
		this.currentPageOptionIndex = this.currentPageOptions[0] ? 0 : -1;
	}
	
	setEnabled()
	{
		this.videosChanged.next(this.getPage());
	}
	
	showVideo(video: Video)
	{
		const index = this.videos.indexOf(video);
		if (index !== -1)
		{
			const pageNumber = Math.ceil((index + 1) / this.getPerPageValue());
			
			this.currentPageOptionIndex = this.currentPageOptions[pageNumber - 1] ? pageNumber - 1 : -1;
			this.videosChanged.next(this.getPage());
		}
	}
	
	getPerPageValue()
	{
		return TablePagerService.perPageOptions[this.perPageIndex].key;
	}
	
	getCurrentPageValue()
	{
		return this.currentPageOptionIndex + 1;
	}
	
	onPerPageChanged()
	{
		this.computeCurrentAndTotal();
		this.videosChanged.next(this.getPage());
	}
	
	onCurrPageChanged()
	{
		this.videosChanged.next(this.getPage());
	}
	
	hasPrevPage()
	{
		return this.getCurrentPageValue() > 1;
	}
	
	hasNextPage()
	{
		return this.getCurrentPageValue() < this.totalPages;
	}
	
	onFirstPage()
	{
		this.currentPageOptionIndex = this.currentPageOptions[0] ? 0 : -1;
		this.videosChanged.next(this.getPage());
	}
	
	onPrevPage()
	{
		this.currentPageOptionIndex = this.currentPageOptions[Math.max(this.currentPageOptionIndex - 1, 0)] ? Math.max(this.currentPageOptionIndex - 1, 0) : -1;
		this.videosChanged.next(this.getPage());
	}
	
	onNextPage()
	{
		this.currentPageOptionIndex = this.currentPageOptions[Math.min(this.currentPageOptionIndex + 1, this.totalPages - 1)] ? Math.min(this.currentPageOptionIndex + 1, this.totalPages - 1) : -1;
		this.videosChanged.next(this.getPage());
	}
	
	onLastPage()
	{
		this.currentPageOptionIndex = this.currentPageOptions[this.totalPages - 1] ? this.totalPages - 1 : -1;
		this.videosChanged.next(this.getPage());
	}
	
	private getPage()
	{
		if (this.enabled)
		{
			return this.videos.slice(this.currentPageOptionIndex * this.getPerPageValue(), (this.currentPageOptionIndex + 1) * this.getPerPageValue());
		}
		else
		{
			return this.videos;
		}
	}
	
	ngOnDestroy()
	{
		this.filteredVideosSubscription.unsubscribe();
	}
}