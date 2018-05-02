import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService
{
	result: any;
	
	constructor(private http: Http) {}
	
	getVideos()
	{
		return this.http.get('/api/videos').map((result) =>
		{
			return this.result = result.json().data;
		});
	}
}
