import { Component, Input, Renderer2, ElementRef, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component
({
	selector: 'app-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit
{
	@Input() data: {key: number, value: string}[] = [];
	@Input() enabled = true;
	@Input() down = true;
	@Input() font = '';
	@Input() size = '20em';
	@Input() selectedKey;
	@Output() selectedKeyChange = new EventEmitter<number>();
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
	
	itemClicked(item: {key: number, value: string})
	{
		if (item.key !== this.selectedKey)
		{
			this.selectedKey = item.key;
			this.open = false;
			this.onChange();
		}
	}
	
	getValue(selectedKey: number, data: {key: number, value: string}[])
	{
		return typeof selectedKey !== 'undefined' && data.find(dataItem => dataItem.key === selectedKey) ? data.find(dataItem => dataItem.key === selectedKey).value : '';
	}
	
	onChange()
	{
		this.selectedKeyChange.emit(this.selectedKey);
	}
}
