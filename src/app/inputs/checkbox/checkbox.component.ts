import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component
({
	selector: 'app-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent
{
	@Input() checked = false;
	@Input() enabled = true;
	@Input() name = 'app-checkbox';
	@Output() changed = new EventEmitter<boolean>();
	
	setEnabled(enabled: boolean)
	{
		this.enabled = enabled;
		this.onChange();
	}
	
	onChange()
	{
		this.changed.emit(this.checked);
	}
}
