import { Component, OnInit, OnDestroy } from '@angular/core';
import { Video } from '../../video/video.model';
import { Subscription } from 'rxjs/Subscription';
import { TableHighlightingService } from './table-highlighting.service';
import { DataService } from '../../data.service';
import { TablePagerService } from '../table-pager/table-pager.service';
import { TableSortingService } from './table-sorting.service';
import { TableSortingColumn } from "./table-sorting-column.model";

@Component
({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy
{
	private videos: Video[];
	private videosChangedSubscription: Subscription;
	private selections: Video[] = [];
	private selectionsSubscription: Subscription;
	private leadSelection: Video;
	private leadSelectionSubscription: Subscription;
	private toHighlight: number;
	private sortableColumns =
	[
		{
			name: 'Name',
			function: this.nameSort,
			sortAsc: true
		},
		{
			name: 'Time',
			function: this.timeSort,
			sortAsc: undefined
		},
		{
			name: 'Series',
			function: this.seriesSort,
			sortAsc: undefined
		},
		{
			name: 'Modified',
			function: this.modifiedSort,
			sortAsc: undefined
		}
	];
	
	constructor(private tablePagerService: TablePagerService, private tableHighlightingService: TableHighlightingService, private dataService: DataService, private tableSortingService: TableSortingService) {}
	
	ngOnInit()
	{
		this.sortableColumns.forEach(column =>
		{
			this.tableSortingService.addSortingColumn(new TableSortingColumn(column.name, column.function), column.sortAsc);
		});
		
		this.videosChangedSubscription = this.tablePagerService.videosChanged.subscribe((videos) =>
		{
			this.videos = videos;
			if (this.toHighlight || this.toHighlight === 0)
			{
				this.tableHighlightingService.highlight(this.videos[this.toHighlight]);
				this.toHighlight = null;
			}
		});
		
		this.selectionsSubscription = this.tableHighlightingService.selectionsChanged.subscribe((videos) =>
		{
			this.selections = videos;
		});
		
		this.leadSelectionSubscription = this.tableHighlightingService.leadSelectedChanged.subscribe((video) =>
		{
			this.leadSelection = video;
		});
	}
	
	private nameSort(videoA: Video, videoB: Video)
	{
		const strA = videoA.fileName.toLocaleLowerCase();
		const strB = videoB.fileName.toLocaleLowerCase();
		
		if (strA < strB)
		{
			return -1;
		}
		else if (strA === strB)
		{
			return 0;
		}
		else
		{
			return 1;
		}
	}
	
	private timeSort(videoA: Video, videoB: Video)
	{
		return videoA.time - videoB.time;
	}
	
	private seriesSort(videoA: Video, videoB: Video)
	{
		const seriesA = videoA.series ? videoA.series : '';
		const seriesB = videoB.series ? videoB.series : '';
		
		if (seriesA < seriesB)
		{
			return -1;
		}
		else if (seriesA === seriesB)
		{
			return 0;
		}
		else
		{
			return 1;
		}
	}
	
	private modifiedSort(videoA: Video, videoB: Video)
	{
		return videoA.lastModified.getTime() - videoB.lastModified.getTime();
	}
	
	getDisplayName(video: Video)
	{
		return Video.getDisplayName(video);
	}
	
	getDisplayTime(video: Video)
	{
		return Video.getDisplayTime(video);
	}
	
	getLastModified(video: Video)
	{
		return Video.getLastModified(video);
	}
	
	onRowClick(event: MouseEvent, video: Video)
	{
		if (event.ctrlKey || event.metaKey)
		{
			this.tableHighlightingService.highlightMulti(video);
		}
		else
		{
			this.tableHighlightingService.highlight(video);
		}
	}
	
	isVideoHighlighted(video: Video)
	{
		return this.selections.includes(video);
	}
	
	isVideoLeadHighlighted(video: Video)
	{
		return this.leadSelection === video;
	}
	
	onPendingChange(video: Video)
	{
		if (confirm('Are you sure you want to change the pending value?'))
		{
			this.dataService.updatePending(video).subscribe
			(
				null,
				(error) =>
				{
					video.pending = true;
				}
			);
		}
		else
		{
			window.setTimeout(() =>
			{
				video.pending = true;
			}, 1);
		}
	}
	
	onKeyDown(event)
	{
		switch (event.keyCode)
		{
			case 38:
				// Up-arrow
				let selectedUp = this.tableHighlightingService.getLeadSelected();
				
				if (selectedUp)
				{
					const currIndex = this.videos.indexOf(selectedUp);
					if (currIndex > 0)
					{
						this.tableHighlightingService.highlight(this.videos[currIndex - 1]);
					}
					else if (currIndex === 0)
					{
						if (this.tablePagerService.hasPrevPage())
						{
							this.toHighlight = this.tablePagerService.getPerPageValue() - 1;
							this.tablePagerService.onPrevPage();
						}
					}
					else
					{
						// another page, navigate
						this.tablePagerService.showVideo(selectedUp);
					}
				}
				else
				{
					this.tableHighlightingService.highlight(this.videos[this.videos.length - 1]);
				}
				
				event.preventDefault();
				break;
			case 40:
				// Down arrow
				let selectedDown = this.tableHighlightingService.getLeadSelected();
				
				if (selectedDown)
				{
					const currIndex = this.videos.indexOf(selectedDown);
					if (currIndex !== -1 && currIndex < this.videos.length - 1)
					{
						this.tableHighlightingService.highlight(this.videos[currIndex + 1]);
					}
					else if (currIndex === this.videos.length - 1)
					{
						if (this.tablePagerService.hasNextPage())
						{
							this.toHighlight = 0;
							this.tablePagerService.onNextPage();
						}
					}
					else
					{
						// another page, navigate
						this.tablePagerService.showVideo(selectedDown);
					}
				}
				else
				{
					this.tableHighlightingService.highlight(this.videos[0]);
				}
				
				event.preventDefault();
				break;
			case 37:
				// Left arrow
				if (this.tablePagerService.hasPrevPage())
				{
					this.tablePagerService.onPrevPage();
				}
				break;
			case 39:
				// Right arrow
				if (this.tablePagerService.hasNextPage())
				{
					this.tablePagerService.onNextPage();
				}
				break;
			case 88:
				// x
				this.tableHighlightingService.unhighlight();
				break;
			case 8:
				// Delete key
				if (event.metaKey)
				{
					let selections = this.tableHighlightingService.getSelections();
					if (selections.length > 0)
					{
						var shouldDelete = confirm('Are you sure you want to delete the selection?');
						if (shouldDelete)
						{
							this.dataService.deleteVideos(selections).subscribe
							(
								(res) =>
								{
									
								},
								(err) =>
								{
									
								}
							);
						}
					}
				}
				break;
		}
	}
	
	ngOnDestroy()
	{
		this.videosChangedSubscription.unsubscribe();
		this.selectionsSubscription.unsubscribe();
		this.leadSelectionSubscription.unsubscribe();
	}
}
