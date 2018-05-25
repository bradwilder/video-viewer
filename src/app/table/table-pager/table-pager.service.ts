import { Subscription } from "rxjs/Subscription";
import { Injectable } from "@angular/core";
import { VideoService } from "../../video/video.service";
import { Video } from "../../video/video.model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TablePagerService
{
	private static perPageOptions =
	[
		{key: '10', value: '10'},
		{key: '20', value: '20'},
		{key: '50', value: '50'},
		{key: '100', value: '100'},
		{key: '200', value: '200'}
	];
	
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
	videos: Video[] = [];
	videosChanged = new Subject<Video[]>();
	currentPageOptions = [];
	currentPageOption = {key: '', value: ''};
	
	constructor(private videoService: VideoService)
	{
		this.videoService.filteredVideosChanged.subscribe((videos) =>
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
		if (!this.currentPageOption.key)
		{
			this.currentPageOption = this.currentPageOptions[0];
		}
		else if (+this.currentPageOption.key > this.totalPages)
		{
			this.currentPageOption = this.currentPageOptions[this.totalPages - 1];
		}
	}
	
	setEnabled(enabled: boolean)
	{
		this.videosChanged.next(this.getPage());
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
	
	onFirstPage()
	{
		this.currentPageOption = this.currentPageOptions[0];
		this.videosChanged.next(this.getPage());
	}
	
	onPrevPage()
	{
		this.currentPageOption = this.currentPageOptions[Math.max(+this.currentPageOption.key - 2, 0)];
		this.videosChanged.next(this.getPage());
	}
	
	onNextPage()
	{
		this.currentPageOption = this.currentPageOptions[Math.min(+this.currentPageOption.key, this.totalPages - 1)];
		this.videosChanged.next(this.getPage());
	}
	
	onLastPage()
	{
		this.currentPageOption = this.currentPageOptions[this.totalPages - 1];
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
}