import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Video } from './video/video.model';

@Injectable()
export class DataService
{
	constructor(private http: Http) {}
	
	getVideos(): Observable<Video[]>
	{
		return this.http.get('/api/videos').map((result) =>
		{
			const videosData = result.json().data;
			return videosData.map((videoData) =>
			{
				let video = new Video();
				video._id = videoData._id;
				video.fileName = videoData.fileName;
				video.fileSize = videoData.fileSize;
				video.lastModified = new Date(videoData.lastModified);
				video.width = +videoData.width;
				video.height = +videoData.height;
				video.time = +videoData.time;
				video.pending = videoData.pending;
				video.series = videoData.series;
				return video;
			});
		});
		
	}
	
	getSeries()
	{
		return this.http.get('/api/series').map((result) => result.json().data);
	}
	
	updatePending(video: Video)
	{
		const obj = {_id: video._id, fileName: video.fileName, pending: video.pending};
		return this.http.post("/api/updatePending", obj);
	}
}
