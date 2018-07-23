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
		{key: '10', value: '10'},
		{key: '20', value: '20'},
		{key: '50', value: '50'},
		{key: '60', value: '60'},
		{key: '70', value: '70'},
		{key: '80', value: '80'},
		{key: '100', value: '100'},
		{key: '200', value: '200'}
	];
	
	private static emptyPageOption = {key: '', value: ''};
	
	static getDefaultPerPageOption()
	{
		return TablePagerService.perPageOptions[2];
	}
	
	static getPerPageOptions()
	{
		return TablePagerService.perPageOptions;
	}
	
	totalPages = 0;
	perPage = TablePagerService.getDefaultPerPageOption();
	enabled = true;
	private videos: Video[] = [];
	videosChanged = new Subject<Video[]>();
	currentPageOptions = [];
	currentPageOption = TablePagerService.emptyPageOption;
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
		this.totalPages = Math.ceil(this.videos.length / +this.perPage.key);
		this.currentPageOptions = [];
		for (let i = 0; i < this.totalPages; i++)
		{
			this.currentPageOptions.push({key: '' + (i + 1), value: '' + (i + 1)});
		}
		this.currentPageOption = this.currentPageOptions[0] ? this.currentPageOptions[0] : TablePagerService.emptyPageOption;
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
			const pageNumber = Math.ceil((index + 1) / +this.perPage.key);
			
			this.currentPageOption = this.currentPageOptions[pageNumber - 1] ? this.currentPageOptions[pageNumber - 1] : TablePagerService.emptyPageOption;
			this.videosChanged.next(this.getPage());
		}
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
		return this.currentPageOption.key ? +this.currentPageOption.key > 1 : false;
	}
	
	hasNextPage()
	{
		return this.currentPageOption.key ? +this.currentPageOption.key < this.totalPages - 1 : false;
	}
	
	onFirstPage()
	{
		this.currentPageOption = this.currentPageOptions[0] ? this.currentPageOptions[0] : TablePagerService.emptyPageOption;
		this.videosChanged.next(this.getPage());
	}
	
	onPrevPage()
	{
		this.currentPageOption = this.currentPageOptions[Math.max(+this.currentPageOption.key - 2, 0)] ? this.currentPageOptions[Math.max(+this.currentPageOption.key - 2, 0)] : TablePagerService.emptyPageOption;
		this.videosChanged.next(this.getPage());
	}
	
	onNextPage()
	{
		this.currentPageOption = this.currentPageOptions[Math.min(+this.currentPageOption.key, this.totalPages - 1)] ? this.currentPageOptions[Math.min(+this.currentPageOption.key, this.totalPages - 1)] : TablePagerService.emptyPageOption;
		this.videosChanged.next(this.getPage());
	}
	
	onLastPage()
	{
		this.currentPageOption = this.currentPageOptions[this.totalPages - 1] ? this.currentPageOptions[this.totalPages - 1] : TablePagerService.emptyPageOption;
		this.videosChanged.next(this.getPage());
	}
	
	getPage()
	{
		if (this.enabled)
		{
			return this.videos.slice((+this.currentPageOption.key - 1) * +this.perPage.key, +this.currentPageOption.key * +this.perPage.key);
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