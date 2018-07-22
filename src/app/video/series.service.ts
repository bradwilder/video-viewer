import { DataService } from "../data.service";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";

@Injectable()
export class SeriesService
{
	private series: string[] = [];
	seriesChanged = new Subject<string[]>();
	
	constructor(private dataService: DataService)
	{
		this.dataService.getSeries().subscribe((res) =>
		{
			this.series = res;
			this.seriesChanged.next(this.series);
		});
	}
}