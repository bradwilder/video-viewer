import { Subscription } from "rxjs/Subscription";
import { Injectable, OnDestroy } from "@angular/core";
import { VideoService } from "../../video/video.service";
import { Video } from "../../video/video.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TablePagerService implements OnDestroy
{
	static perPageValues = [10, 20, 50, 60, 70, 80, 100, 200];
	
	totalPages = 0;
	totalPagesChanged = new Subject<number>();
	perPageValue = 50;
	enabled = true;
	private videos: Video[] = [];
	videosChanged = new Subject<Video[]>();
	currentPage = 0;
	private filteredVideosSubscription: Subscription;
	
	constructor(private videoService: VideoService)
	{
		this.filteredVideosSubscription = this.videoService.filteredVideosChanged.subscribe((videos) =>
		{
			this.videos = videos;
			this.computeTotalPages();
			this.videosChanged.next(this.getPage());
		});
	}
	
	private computeTotalPages()
	{
		this.totalPages = Math.ceil(this.videos.length / this.perPageValue);
		this.totalPagesChanged.next(this.totalPages);
		this.currentPage = 1;
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
			const pageNumber = Math.ceil((index + 1) / this.perPageValue);
			
			this.currentPage = pageNumber;
			this.videosChanged.next(this.getPage());
		}
	}
	
	onPerPageChanged()
	{
		this.computeTotalPages();
		this.videosChanged.next(this.getPage());
	}
	
	onCurrPageChanged()
	{
		this.videosChanged.next(this.getPage());
	}
	
	hasPrevPage()
	{
		return this.currentPage > 1;
	}
	
	hasNextPage()
	{
		return this.currentPage < this.totalPages;
	}
	
	onFirstPage()
	{
		this.currentPage = 1;
		this.videosChanged.next(this.getPage());
	}
	
	onPrevPage()
	{
		this.currentPage = Math.max(this.currentPage - 1, 1);
		this.videosChanged.next(this.getPage());
	}
	
	onNextPage()
	{
		this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
		this.videosChanged.next(this.getPage());
	}
	
	onLastPage()
	{
		this.currentPage = this.totalPages;
		this.videosChanged.next(this.getPage());
	}
	
	private getPage()
	{
		if (this.enabled)
		{
			return this.videos.slice((this.currentPage - 1) * this.perPageValue, this.currentPage * this.perPageValue);
		}
		else
		{
			return this.videos.slice();
		}
	}
	
	ngOnDestroy()
	{
		this.filteredVideosSubscription.unsubscribe();
	}
}