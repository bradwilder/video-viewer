import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component
({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent
{
	@Input() enabled = true;
	@Input() dark = false;
	@Input() primary1 = true;
	@Input() iconClass = '';
	@Input() name = 'app-checkbox';
	@Output() clickEvent = new EventEmitter<Event>();
	
	setEnabled(enabled: boolean)
	{
		this.enabled = enabled;
	}
	
	onClick(event: Event)
	{
		this.clickEvent.emit(event);
	}
}
