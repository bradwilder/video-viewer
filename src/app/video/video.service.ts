import { DataService } from "../data.service";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Video } from "./video.model";

@Injectable()
export class VideoService
{
	private videos: Array<Video> = [];
	videosChanged = new Subject<Array<Video>>();
	
	constructor(private dataService: DataService)
	{
		this.dataService.getVideos().subscribe((res) =>
		{
			this.videos = res;
			this.videosChanged.next(this.getVideos());
		});
	}
	
	getVideos()
	{
		return this.videos.slice();
	}
}