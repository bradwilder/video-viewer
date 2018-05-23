import { DataService } from "../data.service";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Video } from "./video.model";
import { TableFiltersService } from "../table/table-filters/table-filters.service";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class VideoService
{
	private videos: Array<Video> = [];
	videosChanged = new Subject<Array<Video>>();
	filtersSubscription: Subscription;
	
	constructor(private dataService: DataService, private filtersService: TableFiltersService)
	{
		this.dataService.getVideos().subscribe((res) =>
		{
			this.videos = res;
			this.videosChanged.next(this.getVideos());
		});
		
		this.filtersSubscription = this.filtersService.filtersChanged.subscribe(() =>
		{
			this.videosChanged.next(this.getVideos());
		});
	}
	
	getVideos()
	{
		return this.filtersService.filter(this.videos);
	}
	
	getVideosCount()
	{
		return this.getVideos().length;
	}
}