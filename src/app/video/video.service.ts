import { DataService } from "../data.service";
import { Subject } from "rxjs/Subject";
import { Injectable, OnDestroy } from "@angular/core";
import { Video } from "./video.model";
import { TableFiltersService } from "../table/table-filters/table-filters.service";
import { Subscription } from "rxjs/Subscription";
import { TableSortingService } from "../table/table/table-sorting.service";

@Injectable()
export class VideoService implements OnDestroy
{
	private videos: Video[] = [];
	private filteredVideos: Video[];
	filteredVideosChanged = new Subject<Video[]>();
	videosCountChanged = new Subject<number>();
	filteredCountChanged = new Subject<number>();
	private filtersSubscription: Subscription;
	private sortingSubscription: Subscription;
	
	private series: string[] = [];
	seriesChanged = new Subject<string[]>();
	
	constructor(private dataService: DataService, private filtersService: TableFiltersService, private sortingService: TableSortingService)
	{
		this.dataService.getVideos().subscribe((res) =>
		{
			this.videos = this.sortingService.sort(res);
			this.videosCountChanged.next(this.videos.length);
			this.filteredVideos = this.filtersService.filter(this.videos);
			this.filteredCountChanged.next(this.filteredVideos.length);
			this.filteredVideosChanged.next(this.filteredVideos);
		});
		
		this.dataService.getSeries().subscribe((res) =>
		{
			this.series = res;
			this.seriesChanged.next(this.series);
		});
		
		this.filtersSubscription = this.filtersService.filtersChanged.subscribe(() =>
		{
			this.filteredVideos = this.filtersService.filter(this.videos);
			this.filteredCountChanged.next(this.filteredVideos.length);
			this.filteredVideosChanged.next(this.filteredVideos);
		});
		
		this.sortingSubscription = this.sortingService.sortingChanged.subscribe(() =>
		{
			this.videos = this.sortingService.sort(this.videos);
			this.filteredVideos = this.filtersService.filter(this.videos);
			this.filteredVideosChanged.next(this.filteredVideos);
		});
	}
	
	ngOnDestroy()
	{
		this.filtersSubscription.unsubscribe();
		this.sortingSubscription.unsubscribe();
	}
}