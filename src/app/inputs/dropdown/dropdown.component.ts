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
	@Input() data: any;
	@Input() enabled = true;
	@Input() down = true;
	@Input() font = '';
	@Input() size = '20em';
	@Input() selectedItem = '';
	@Output() changed = new EventEmitter<string>();
	open = false;
	dataNormalized = [];
	
	constructor(private renderer: Renderer2, private elRef: ElementRef) {}
	
	ngOnInit()
	{
		let props = Object.keys(this.data);
		for (let prop of props)
		{
			this.dataNormalized.push({key: prop, value: this.data[prop]});
		}
		
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
		this.onChange();
	}
	
	itemClicked(key: string)
	{
		if (key !== this.selectedItem)
		{
			this.selectedItem = key;
			this.open = false;
			this.onChange();
		}
	}
	
	onChange()
	{
		this.changed.emit(this.selectedItem);
	}
	
	getDataValue(key: string)
	{
		return this.data[key];
	}
}
