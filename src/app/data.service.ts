import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService
{
	constructor(private http: Http) {}
	
	getVideos()
	{
		return this.http.get('/api/videos').map((result) => result.json().data);
	}
	
	getSeries()
	{
		return this.http.get('/api/series').map((result) => result.json().data);
	}
}
