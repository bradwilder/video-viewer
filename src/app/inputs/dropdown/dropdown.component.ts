import { Component, Input, Renderer2, ElementRef, OnInit } from '@angular/core';

@Component
({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit
{
	@Input() data: Array<{key: string, value: string}>;
	@Input() enabled = true;
	@Input() down = true;
	@Input() single = true;
	@Input() font = '';
	@Input() size = '20em';
	selection = {key: '', value: ''};
	selections: Array<{key: string, value: string}> = [];
	open = false;
	
	constructor(private renderer: Renderer2, private elRef: ElementRef) {}
	
	ngOnInit()
	{
		this.renderer.listen(window, 'click', (event) =>
		{
			if (!this.elRef.nativeElement.contains(event.target))
			{
				this.open = false;
			}
		});
	}
	
	setEnabled(enabled: boolean)
	{
		this.enabled = enabled;
	}
	
	itemClicked(item: {key: string, value: string})
	{
		if ((this.single && item !== this.selection) || (!this.single && !this.selections.includes(item)))
		{
			if (this.single)
			{
				this.selection = item;
				this.open = false;
			}
			else
			{
				this.selections.push(item);
			}
		}
	}
	
	deselectMulti(event: Event, item: {key: string, value: string})
	{
		event.stopPropagation();
		
		const index = this.selections.indexOf(item);
		this.selections.splice(index, 1);
	}
}
