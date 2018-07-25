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
	@Input() selectedIndex = -1;
	@Output() selectedIndexChange = new EventEmitter<number>();
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
		if (item !== this.data[this.selectedIndex])
		{
			this.selectedIndex = this.data.indexOf(item);
			this.open = false;
			this.onChange();
		}
	}
	
	onChange()
	{
		this.selectedIndexChange.emit(this.selectedIndex);
	}
}
