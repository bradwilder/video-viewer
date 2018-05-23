import { DataService } from "../data.service";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Video } from "./video.model";
import { TableFiltersService } from "../table/table-filters/table-filters.service";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class VideoService
{
	private videos: Video[] = [];
	private filteredVideos: Video[];
	filteredVideosChanged = new Subject<Video[]>();
	filtersSubscription: Subscription;
	videosCountChanged = new Subject<number>();
	filteredCountChanged = new Subject<number>();
	
	constructor(private dataService: DataService, private filtersService: TableFiltersService)
	{
		this.dataService.getVideos().subscribe((res) =>
		{
			this.videos = res;
			this.videosCountChanged.next(this.videos.length);
			this.filteredVideos = this.filtersService.filter(this.videos);
			this.filteredCountChanged.next(this.filteredVideos.length);
			this.filteredVideosChanged.next(this.filteredVideos);
		});
		
		this.filtersSubscription = this.filtersService.filtersChanged.subscribe(() =>
		{
			this.filteredVideos = this.filtersService.filter(this.videos);
			this.filteredCountChanged.next(this.filteredVideos.length);
			this.filteredVideosChanged.next(this.filteredVideos);
		});
	}
}