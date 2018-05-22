import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component
({
	selector: 'app-radio',
	templateUrl: './radio.component.html',
	styleUrls: ['./radio.component.scss']
})
export class RadioComponent
{
	@Input() data: Array<{key: string, value: string}>;
	@Input() selectedKey = '';
	@Input() enabled = true;
	@Input() font = '';
	@Input() name = 'app-radio';
	@Output() changed = new EventEmitter<string>();
	
	setEnabled(enabled: boolean)
	{
		this.enabled = enabled;
		this.onChange();
	}
	
	onChange()
	{
		this.changed.emit(this.selectedKey);
	}
}
