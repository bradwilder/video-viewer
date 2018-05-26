import { Video } from '../../video/video.model';
import { Subject } from 'rxjs/Subject';

export class TableHighlightingService
{
	private selections: Video[] = [];
	selectionsChanged = new Subject<Video[]>();
	
	private leadSelected: Video;
	leadSelectedChanged = new Subject<Video>();
	
	highlight(video: Video)
	{
		if (this.selections.length !== 1 || this.selections[0] !== video || this.leadSelected !== video)
		{
			this.selections = [];
			this.selections.push(video);
			this.selectionsChanged.next(this.selections);
			
			this.leadSelected = video;
			this.leadSelectedChanged.next(this.leadSelected);
		}
	}
	
	highlightMulti(video: Video)
	{
		let wasHighlighted = this.selections.includes(video);
		
		if (wasHighlighted)
		{
			let index = this.selections.indexOf(video);
			this.selections.splice(index, 1);
			this.selectionsChanged.next(this.selections);
			
			if (this.leadSelected === video)
			{
				this.leadSelected = null;
				this.leadSelectedChanged.next(this.leadSelected);
			}
		}
		else
		{
			this.selections.push(video);
			this.selectionsChanged.next(this.selections);
			
			this.leadSelected = video;
			this.leadSelectedChanged.next(this.leadSelected);
		}
	}
	
	unhighlight()
	{
		this.selections = [];
		this.selectionsChanged.next(this.selections);
		
		this.leadSelected = null;
		this.leadSelectedChanged.next(this.leadSelected);
	}
	
	getSelections()
	{
		return this.selections;
	}
	
	getLeadSelected()
	{
		return this.leadSelected;
	}
}