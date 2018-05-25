import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableHighlightingService } from '../../table/table/table-highlighting.service';
import { Subscription } from 'rxjs/Subscription';
import { Video } from '../../video/video.model';
import { DataService } from '../../data.service';

@Component
({
	selector: 'app-image-detail',
	templateUrl: './image-detail.component.html',
	styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit, OnDestroy
{
	leadSelection: Video;
	leadSelectionSubscription: Subscription;
	imageSrc: string;
	hasFullSize = false;
	
	constructor(private tableHighlightingService: TableHighlightingService, private dataService: DataService) {}
	
	ngOnInit()
	{
		this.leadSelectionSubscription = this.tableHighlightingService.leadSelectedChanged.subscribe((video) =>
		{
			this.leadSelection = video;
			if (this.leadSelection)
			{
				this.dataService.getThumb(this.leadSelection).subscribe((data) =>
				{
					this.imageSrc = 'data:image/png;base64,' + data.img;
					this.hasFullSize = data.hasFullSize;
				});
			}
			else
			{
				this.imageSrc = null;
				this.hasFullSize = false;
			}
		});
	}
	
	ngOnDestroy()
	{
		this.leadSelectionSubscription.unsubscribe();
	}
}
